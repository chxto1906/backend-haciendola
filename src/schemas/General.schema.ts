import { z } from 'zod';

export const IdParamSchema = z.object({
    id: z.string({
      required_error: 'El id es requerido',
    }).transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El id debe ser un valor numerico',
        });
        return z.NEVER;
      }
      return parsed;
    }),
  });
  
  export const FiltersPaginationQuerySchema = z.object({
    value: z.string().optional(),
    page: z.string({
      required_error: 'El numero de pagina es requerida',
    }).default('1').transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El page debe ser un valor numerico',
        });
        return z.NEVER;
      }
      return parsed;
    }),
    pageSize: z.string({
      required_error: 'La longitud por pagina es requerida',
    }).default('10').transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El pageSize debe ser un valor numerico',
        });
        return z.NEVER;
      }
      return parsed;
    }),
  });