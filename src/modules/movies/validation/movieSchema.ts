import { z } from "zod";

export const movieSchema = z.object({
    title: z
        .string()
        .min(2, { message: "El titulo debe tener al menos 2 caracteres,"}),
    poster: z
        .string()
        .min(2, { message: "El poster debe tener al menos 2 caracteres."}),
    duration: z
        .number(),
    country: z
        .string()
        .min(2, { message: "El país debe tener al menos 2 caracteres."}),
    releaseDate: z
        .string()
        .min(2, { message: "La fecha de lanzamiento debe tener al menos 2 caracteres."}),
    popularity: z
        .number(),
});

export type movieFormData = z.infer<typeof movieSchema>;