import { ZodError } from 'zod';
import { UserNotFoundError } from '../../errors/user.js';
import { getTransactionsByUserIdSchema } from '../../schemas/transaction.js';
import {
    serverError,
    userNotFoundResponse,
    ok,
    badRequest,
} from '../helpers/index.js';

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;
            const from = httpRequest.query.from;
            const to = httpRequest.query.to;
            //verificar se o userid foi passado como parametro
            await getTransactionsByUserIdSchema.parseAsync({
                user_id: userId,
                from,
                to,
            });

            //chamar o useCase
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute(
                    userId,
                    from,
                    to,
                );

            //retornar resposta http
            return ok(transactions);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                });
            }
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            console.error(error);
            return serverError();
        }
    }
}
