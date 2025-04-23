// RAIZ DO PROJETO
import 'dotenv/config.js';
import express from 'express';
import {
    makeCreateUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
    makeDeleteUserController,
} from './src/factories/controllers/user.js';
import {
    makeCreateTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionController,
    makeDeleteTransactionController,
} from './src/factories/controllers/transaction.js';
import cors from 'cors';

//

const app = express();

app.use(express.json());

app.use(cors());

app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController();

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
});

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController();

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).send(body);
});
app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = makeDeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(request);

    response.status(statusCode).send(body);
});

/////////////////////////////////////////////////////////////////////////
// TRANSACTIONS
/////////////////////////////////////////////////////////////////////////

app.post('/api/transactions', async (request, response) => {
    const createTransactionController = makeCreateTransactionController();

    const { statusCode, body } =
        await createTransactionController.execute(request);
    response.status(statusCode).send(body);
});

app.get('/api/transactions', async (request, response) => {
    const getTransactionsByUserIdController =
        makeGetTransactionsByUserIdController();

    const { statusCode, body } =
        await getTransactionsByUserIdController.execute(request);
    response.status(statusCode).send(body);
});

app.patch('/api/transactions/:transactionId', async (request, response) => {
    const updateTransationController = makeUpdateTransactionController();
    const { statusCode, body } =
        await updateTransationController.execute(request);

    response.status(statusCode).send(body);
});

app.delete('api/transactions/:transactionId', async (request, response) => {
    const deleteTransactionController = makeDeleteTransactionController();
    const { statusCode, body } =
        await deleteTransactionController.execute(request);

    response.status(statusCode).send(body);
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () =>
    // eslint-disable-next-line no-undef
    console.log(`listening on port ${process.env.PORT}`),
);
