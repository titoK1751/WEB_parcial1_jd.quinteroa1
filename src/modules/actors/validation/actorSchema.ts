import { z } from "zod";

export const actorSchema = z.object({
    name: z
        .string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    photo: z
        .string(),
    nationality: z
        .string()
        .min(2, { message: "La nacionalidad debe tener al menos 2 caracteres." }),
    biography: z
        .string()
        .min(2, { message: "La biografía debe tener al menos 2 caracteres." }),
    birthDate: z
        .string()
        .min(2, { message: "La fecha de nacimiento debe tener al menos 2 caracteres." }),
});

export type actorFormData = z.infer<typeof actorSchema>;