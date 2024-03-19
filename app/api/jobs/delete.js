
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    // Get the job id from the request body
    const { id } = req.body;

    // Delete the job listing from the database
    const { data, error } = await supabase
      .from('jobs')
      .delete()
      .match({ id });

    // Handle any errors
    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Return a success message
    return res.status(200).json({ message: 'Job listing deleted successfully', data });
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
