import { Router } from 'express';
import {
    makeGetUserByIdController,
    makeCreateUserController,
    makeUpdateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
} from '../factories/controllers/user.js';
import { auth } from '../middlewares/auth.js';

export const usersRouter = Router();

usersRouter.get('/me', auth, async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();

    console.log('Usuário Autenticado:', request.userId);

    const { statusCode, body } = await getUserByIdController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    });

    response.status(statusCode).send(body);
});

usersRouter.post('/', async (request, response) => {
    const createUserController = makeCreateUserController();

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
});

usersRouter.patch('/me', auth, async (request, response) => {
    const updateUserController = makeUpdateUserController();

    const { statusCode, body } = await updateUserController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    });

    response.status(statusCode).send(body);
});

usersRouter.delete('/me', auth, async (request, response) => {
    const deleteUserController = makeDeleteUserController();

    const { statusCode, body } = await deleteUserController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    });

    response.status(statusCode).send(body);
});

usersRouter.get('/me/balance', auth, async (request, response) => {
    const getUserBalanceController = makeGetUserBalanceController();
    const { statusCode, body } = await getUserBalanceController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
        query: {
            from: request.query.from,
            to: request.query.to,
        },
    });
    response.status(statusCode).send(body);
});
