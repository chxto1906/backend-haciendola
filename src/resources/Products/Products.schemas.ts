import { z } from 'zod';

export const CreateBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  handle: z.string(),
  sku: z.string(),
  grams: z.number(),
  stock: z.number(),
  price: z.number(),
  comparePrice: z.number(),
  barcode: z.string(),
});

export const UpdateBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  handle: z.string().optional(),
  sku: z.string().optional(),
  grams: z.number().optional(),
  stock: z.number().optional(),
  price: z.number().optional(),
  comparePrice: z.number().optional(),
  barcode: z.string().optional(),
});

