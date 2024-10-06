import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const stripeEvent = req.body;

  // Handle different Stripe events
  const sig = req.headers['stripe-signature'];

  let event;

  // Verify Stripe webhook signature
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.log(`⚠️  Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const userId = checkoutSession.client_reference_id;

      // Update Supabase user with subscription information
      try {
        await supabase
          .from('users')
          .update({
            subscription_id: checkoutSession.subscription?.id,
            subscription_status: checkoutSession.subscription?.status,
          })
          .eq('id', userId);
      } catch (error) {
        console.error(`⚠️  Error updating Supabase user: ${error}`);
      }
      break;
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      const customer = subscription.customer;
      const user = await supabase
        .from('users')
        .select('*')
        .eq('stripe_customer_id', customer);

      // Update Supabase user with subscription information
      if (user.data.length > 0) {
        try {
          await supabase
            .from('users')
            .update({
              subscription_id: subscription.id,
              subscription_status: subscription.status,
            })
            .eq('id', user.data[0].id);
        } catch (error) {
          console.error(`⚠️  Error updating Supabase user: ${error}`);
        }
      }
      break;
    // Add more cases for different Stripe events
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}