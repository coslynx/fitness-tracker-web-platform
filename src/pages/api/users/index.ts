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
        const { data: users, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', supabaseUser.id);

        if (error) {
          throw error;
        }

        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
      }
      break;
    case 'PUT':
      try {
        const { data, error } = await supabase
          .from('users')
          .update({ ...req.body })
          .eq('id', supabaseUser.id);

        if (error) {
          throw error;
        }

        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
      }
      break;
    case 'DELETE':
      try {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', supabaseUser.id);

        if (error) {
          throw error;
        }

        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}