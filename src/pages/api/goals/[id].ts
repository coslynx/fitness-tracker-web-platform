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
        const { data: goal, error } = await supabase
          .from('goals')
          .select('*')
          .eq('id', id)
          .eq('user_id', supabaseUser.id);

        if (error) {
          throw error;
        }

        res.status(200).json(goal);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching goal' });
      }
      break;
    case 'PUT':
      try {
        const { data, error } = await supabase
          .from('goals')
          .update({ ...req.body })
          .eq('id', id)
          .eq('user_id', supabaseUser.id);

        if (error) {
          throw error;
        }

        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Error updating goal' });
      }
      break;
    case 'DELETE':
      try {
        const { error } = await supabase
          .from('goals')
          .delete()
          .eq('id', id)
          .eq('user_id', supabaseUser.id);

        if (error) {
          throw error;
        }

        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting goal' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}