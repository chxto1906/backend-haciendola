import { z } from 'zod';

export const CreateBodySchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
});

export const UpdateBodySchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
});

export const LoginBodySchema = z.object({
  username: z.string({required_error: 'El email es requerido'}),
  password: z.string({required_error: 'El password es requerido'}),
});

