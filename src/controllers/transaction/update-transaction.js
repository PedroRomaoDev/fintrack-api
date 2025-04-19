import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    ok,
    badRequest,
} from '../helpers/index.js';
import { updateTransactionSchema } from '../../schemas/transaction.js';
import { ZodError } from 'zod';

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(
                //verificar se o id é válido
                httpRequest.params.transactionId,
            );

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const params = httpRequest.body;

            await updateTransactionSchema.parseAsync(params); //verifica se o body está correto com schema do zod

            const transaction = await this.updateTransactionUseCase.execute(
                httpRequest.params.transactionId,
                params,
            );

            return ok(transaction); //retorna o objeto atualizado
        } catch (error) {
            if (error instanceof ZodError) {
                //verifica se o erro é do tipo ZodError
                return badRequest({
                    message: error.errors[0].message,
                });
            }
            console.error(error);

            return serverError();
        }
    }
}
