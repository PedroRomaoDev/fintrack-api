import { Router } from 'express';
import {
    makeGetTransactionsByUserIdController,
    makeCreateTransactionController,
    makeUpdateTransactionController,
    makeDeleteTransactionController,
} from '../factories/controllers/transaction.js';

export const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
    const getTransactionsByUserIdController =
        makeGetTransactionsByUserIdController();

    const { statusCode, body } =
        await getTransactionsByUserIdController.execute(request);
    response.status(statusCode).send(body);
});

transactionsRouter.post('/', async (request, response) => {
    const createTransactionController = makeCreateTransactionController();

    const { statusCode, body } =
        await createTransactionController.execute(request);
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
