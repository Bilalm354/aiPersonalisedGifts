import { stripeServerClient } from "./client";

interface checkOutSessionParams {
  referer: string;
  origin: string;
  totalStripePrice: number;
  totalShipping: number;
  orderTitle: string;
  orderVariantLabel: string;
  orderPreview: string;
}

export async function createCheckoutSession(params: checkOutSessionParams) {
  const {
    referer,
    origin,
    totalStripePrice,
    totalShipping,
    orderTitle,
    orderVariantLabel,
    orderPreview,
  } = params;
  return await stripeServerClient.checkout.sessions.create({
    customer_email: "test@example.com",
    shipping_options: [
      {
        shipping_rate_data: {
          // TODO: Figure out dynamically for other shipping options
          type: "fixed_amount",
          fixed_amount: {
            currency: "gbp",
            amount: totalShipping,
          },
          display_name: "Standard",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      },
    ],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: `T-shirt - ${orderVariantLabel}`, // TODO: Figure out dynamically
            description: orderTitle,
            images: [orderPreview],
          },
          unit_amount_decimal: totalStripePrice.toString(),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/payment/success`,
    cancel_url: referer,
    automatic_tax: {
      enabled: true,
    },
  });
}
