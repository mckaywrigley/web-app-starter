--------------- TODOS ---------------

-- TABLE --

CREATE TABLE IF NOT EXISTS todos (
    -- ID
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- RELATIONSHIPS
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,

    -- METADATA
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,

    -- REQUIRED
    title TEXT NOT NULL CHECK (char_length(title) <= 200),
    description TEXT CHECK (char_length(description) <= 1000),
    is_completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- INDEXES --

CREATE INDEX idx_todos_user_id ON todos (user_id);

-- RLS --

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow user access to their todos"
    ON todos
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
