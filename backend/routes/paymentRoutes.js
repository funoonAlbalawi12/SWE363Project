import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/checkout", async (req, res) => {
  const { eventTitle, price, quantity } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "sar",
            product_data: {
              name: eventTitle,
            },
            unit_amount: price * 100,
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/ticket-success?from=stripe",
      cancel_url: "http://localhost:3000/explore-events",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Checkout error:", err);
    res.status(500).json({ error: "Checkout session failed" });
  }
});

export default router;
