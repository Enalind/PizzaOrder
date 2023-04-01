import { loadStripe } from "../../../../../packages/stripe"
export async function POST(req, response) {
  // const stripe = await loadStripe()
  // const payload = req.body
  // const sig = req.headers["stripe-signature"]
  // const endpointSecret = "whsec_3dab0bb2172997ac9e6f0bff7cf1beb9c2e61fde227e3524346b77cf915be332";
  // let event;

  // try{
  //   event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  // }
  // catch(e){
  //   response.status(400).send("Webhook Error:" + e.message)
  //   return
  // }
  // console.log(`Unhandled event type ${event.type}`);

  // // Return a 200 response to acknowledge receipt of the event
  // response.send();
  response.status(200).json({ name: 'John Doe' })
};
