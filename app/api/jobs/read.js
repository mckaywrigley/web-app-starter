
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Retrieve job listings from the database
    const { data, error } = await supabase
      .from('jobs')
      .select('*');

    // Handle any errors
    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Return the job listings
    return res.status(200).json(data);
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
