
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    // Get job details and id from the request body
    const { id, title, description, company, location, application_link, user_id } = req.body;

    // Update the job listing in the database
    const { data, error } = await supabase
      .from('jobs')
      .update({
        title,
        description,
        company,
        location,
        application_link,
        user_id,
      })
      .match({ id });

    // Handle any errors
    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Return the updated job details
    return res.status(200).json(data);
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
