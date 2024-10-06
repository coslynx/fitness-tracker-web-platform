import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user: supabaseUser } = await supabase.auth.getUser();

  if (!supabaseUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      try {
        const { data: progressData, error } = await supabase
          .from('progress')
          .select('*')
          .eq('id', id)
          .eq('user_id', supabaseUser.id);

        if (error) {
          throw error;
        }

        res.status(200).json(progressData);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching progress data' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}