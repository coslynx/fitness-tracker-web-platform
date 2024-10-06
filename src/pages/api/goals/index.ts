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

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { data: goals, error } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', supabaseUser.id);

        if (error) {
          throw error;
        }

        res.status(200).json(goals);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching goals' });
      }
      break;
    case 'POST':
      try {
        const { data, error } = await supabase
          .from('goals')
          .insert({
            user_id: supabaseUser.id,
            ...req.body,
          });

        if (error) {
          throw error;
        }

        res.status(201).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Error creating goal' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}