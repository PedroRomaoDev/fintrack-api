import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
} from '../../repositories/postgres/index.js';
import { CreateUserUseCase } from '../../use-cases/index.js';
import { CreateUserController } from '../../controllers/index.js';

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const createUserRepository = new PostgresCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    // Log para verificar se o controlador foi criado corretamente
    console.log('CreateUserController criado com sucesso');

    return createUserController;
};
