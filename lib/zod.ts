import { z } from "zod";

export const configurationSchema = z.object({
  bodyColor: z.string(),
  earCushionColor: z.string(),
  frameFinish: z.string(),
  engravingText: z.string().max(28).optional().default(""),
  logoEngraving: z.boolean().default(true),
  earcupTexture: z.string(),
  ambientLighting: z.string(),
  edition: z.string(),
  accessories: z.array(z.string()).default([]),
  quantity: z.number().min(1).max(4).default(1)
});

export const checkoutSchema = z.object({
  cartItems: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      quantity: z.number().min(1),
      unitPrice: z.number().min(0),
      configuration: configurationSchema.optional()
    })
  ),
  couponCode: z.string().optional(),
  shippingRate: z.number().min(0).default(0)
});
