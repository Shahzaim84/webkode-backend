import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    
export const payment = async (subscriptionType, email) => {
    let environment;
    if(subscriptionType === "Basic"){
        environment = process.env.BASIC_PRICE_ID;
    }else if(subscriptionType === "Standard"){
        environment = process.env.STANDARD_PRICE_ID;
    }else if(subscriptionType === "Premium"){
        environment = process.env.PREMIUM_PRICE_ID;
    }
    const user = await userModel.findOne({email: email});
    user.subscriptionType = subscriptionType;
    await user.save();
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: environment, 
            quantity: 1,
          },
        ],
        customer_email: email,
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });
  
      let url = session.url;
      return url;
};

export const subscribe = async (sessionId, email) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    let status = false;
    if (session.payment_status === 'paid') {
        status = true;
        const user = await userModel.findOne({email: email});
        user.isSubscribed = true;
        await user.save();
    } else {
        status = false;
    }
    
    return status;
};
