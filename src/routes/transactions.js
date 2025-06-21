import { Router } from 'express';
import {
    makeGetTransactionsByUserIdController,
    makeCreateTransactionController,
    makeUpdateTransactionController,
    makeDeleteTransactionController,
} from '../factories/controllers/transaction.js';
import { auth } from '../middlewares/auth.js';

export const transactionsRouter = Router();

transactionsRouter.get('/me', auth, async (request, response) => {
    const getTransactionsByUserIdController =
        makeGetTransactionsByUserIdController();

    const { statusCode, body } =
        await getTransactionsByUserIdController.execute({
            ...request,
            query: {
                ...request.query,
                from: request.query.from,
                to: request.query.to,
                userId: request.userId,
            },
        });
    response.status(statusCode).send(body);
});

transactionsRouter.post('/me', auth, async (request, response) => {
    const createTransactionController = makeCreateTransactionController();

    const { statusCode, body } = await createTransactionController.execute({
        ...request,
        body: {
            ...request.body,
            user_id: request.userId,
        },
    });
    response.status(statusCode).send(body);
});

transactionsRouter.patch('/:transactionId', async (request, response) => {
    const updateTransationController = makeUpdateTransactionController();
    const { statusCode, body } =
        await updateTransationController.execute(request);

    response.status(statusCode).send(body);
});

transactionsRouter.delete('/:transactionId', async (request, response) => {
    const deleteTransactionController = makeDeleteTransactionController();

    const { statusCode, body } =
        await deleteTransactionController.execute(request);

    response.status(statusCode).send(body);
});
