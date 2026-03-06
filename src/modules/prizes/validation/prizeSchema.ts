import { z } from "zod";

export const prizeSchema = z.object({
    name: z
        .string()
        .min(2, { message: "El nombre del premio debe tener al menos 2 caracteres." }),
    category: z
        .string()
        .min(2, { message: "La categoria del premio debe tener al menos 2 caracteres." }),
    year: z
        .number({ message: "El anio es obligatorio." })
        .int({ message: "El anio debe ser un numero entero." })
        .min(1800, { message: "El anio debe ser valido." })
        .max(3000, { message: "El anio debe ser valido." }),
    status: z
        .enum(["won", "nominated"], {
            message: "El estado debe ser 'won' o 'nominated'.",
        }),
});

export type prizeFormData = z.infer<typeof prizeSchema>;
