
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Get job details from the request body
    const { title, description, company, location, application_link, user_id } = req.body;

    // Insert the new job into the database
    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          title,
          description,
          company,
          location,
          application_link,
          user_id,
        },
      ]);

    // Handle any errors
    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Return the new job details
    return res.status(200).json(data);
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
