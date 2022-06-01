const stripeJs = async () => await import("@stripe/stripe-js/pure");

import axios from "axios";
const { loadStripe } = await stripeJs();
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe("#");

export const createCheckOutSession = async (item) => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-stripe-session", {
        item: item
    });
    const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id
    });
    if (result.error) {
        alert(result.error.message);
    }
};
