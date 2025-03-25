import { z } from 'zod';

export const createUserSchema = z.object({
    first_name: z
        .string({
            required_error: 'O primeiro nome é obrigatório.',
        })
        .trim()
        .min(1, {
            message: 'O primeiro nome é obrigatório.',
        }),
    last_name: z
        .string({
            required_error: 'O sobrenome é obrigatório.',
        })
        .trim()
        .min(1, {
            message: 'O sobrenome é obrigatório.',
        }),
    email: z
        .string({
            required_error: 'O e-mail é obrigatório.',
        })
        .email({
            message: 'Por favor, informe um e-mail válido.',
        })
        .trim()
        .min(1),
    password: z
        .string({
            required_error: 'A senha é obrigatória.',
        })
        .trim()
        .min(6, {
            message: 'A senha deve ter pelo menos 6 caracteres.',
        }),
});

export const updateUserSchema = createUserSchema.partial().strict({
    message: 'Algum dos campos fornecidos não é permitido.',
});
