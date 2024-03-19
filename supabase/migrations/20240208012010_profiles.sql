--------------- PROFILES ---------------

-- TABLE --

CREATE TABLE IF NOT EXISTS profiles (
    -- ID
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- RELATIONSHIPS
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,

    -- METADATA
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,

    -- REQUIRED
    bio TEXT NOT NULL CHECK (char_length(bio) <= 500),
    has_onboarded BOOLEAN NOT NULL DEFAULT FALSE,
    image_url TEXT NOT NULL CHECK (char_length(image_url) <= 1000), -- public file url in profile_images bucket
    image_path TEXT NOT NULL CHECK (char_length(image_path) <= 1000), -- file path in profile_images bucket
    display_name TEXT NOT NULL CHECK (char_length(display_name) <= 100),
    username TEXT NOT NULL UNIQUE CHECK (char_length(username) >= 3 AND char_length(username) <= 25),

    -- STRIPE
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    membership TEXT DEFAULT 'free' CHECK (membership IN ('free', 'pro', 'enterprise')),

    -- OPENAI
    openai_api_key TEXT CHECK (char_length(openai_api_key) <= 1000),
    openai_organization_id TEXT CHECK (char_length(openai_organization_id) <= 1000)
);

-- INDEXES --

CREATE INDEX idx_profiles_user_id ON profiles (user_id);

-- RLS --

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to own profiles"
    ON profiles
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- FUNCTIONS --

CREATE OR REPLACE FUNCTION delete_old_profile_image()
RETURNS TRIGGER
LANGUAGE 'plpgsql'
SECURITY DEFINER
AS $$
DECLARE
  status INT;
  content TEXT;
BEGIN
  IF TG_OP = 'DELETE' THEN
    SELECT
      INTO status, content
      result.status, result.content
      FROM public.delete_storage_object_from_bucket('profile_images', OLD.image_path) AS result;
    IF status <> 200 THEN
      RAISE WARNING 'Could not delete profile image: % %', status, content;
    END IF;
  END IF;
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

-- TRIGGERS --

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE OR REPLACE FUNCTION create_profile_and_workspace() 
RETURNS TRIGGER
security definer set search_path = public
AS $$
DECLARE
    random_username TEXT;
BEGIN
    -- Generate a random username
    random_username := 'user' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 16);

    -- Create a profile for the new user
    INSERT INTO public.profiles(user_id, has_onboarded, username, display_name, bio, image_url, image_path, membership)
    VALUES(
        NEW.id,
        FALSE,
        random_username,
        '',
        '',
        '',
        '',
        'free'
    );
    RETURN NEW;

END;
$$ language 'plpgsql';

CREATE TRIGGER create_profile_and_workspace_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.create_profile_and_workspace();

CREATE TRIGGER delete_old_profile_image
AFTER DELETE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE delete_old_profile_image();

-- STORAGE --

INSERT INTO storage.buckets (id, name, public) VALUES ('profile_images', 'profile_images', true);

CREATE POLICY "Allow public read access on profile images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'profile_images');

CREATE POLICY "Allow authenticated insert access to own profile images"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'profile_images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Allow authenticated update access to own profile images"
    ON storage.objects FOR UPDATE TO authenticated
    USING (bucket_id = 'profile_images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Allow authenticated delete access to own profile images"
    ON storage.objects FOR DELETE TO authenticated
    USING (bucket_id = 'profile_images' AND (storage.foldername(name))[1] = auth.uid()::text);