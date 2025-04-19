import { CreateTransactionController } from '../../controllers/index.js';
import {
    PostgresGetUserByIdRepository,
    PostgresCreateTransactionRepository,
} from '../../repositories/postgres/index.js';
import { CreateTransactionUseCase } from '../../use-cases/index.js';
import { IdGeneratorAdapter } from '../../../adapters/index.js';

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const idGeneratorAdapter = new IdGeneratorAdapter();

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
        idGeneratorAdapter,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );
    return createTransactionController;
};
