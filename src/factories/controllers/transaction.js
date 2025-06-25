import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
    DeleteTransactionController,
} from '../../controllers/index.js';
import {
    PostgresGetUserByIdRepository,
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByUserIdRepository,
    PostgresUpdateTransactionRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionByIdRepository,
} from '../../repositories/postgres/index.js';
import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
} from '../../use-cases/index.js';
import { IdGeneratorAdapter } from '../../adapters/index.js';

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

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionByUserIdRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getTransactionsByUserIdRepository,
        getUserByIdRepository,
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);

    return getTransactionsByUserIdController;
};

export const makeUpdateTransactionController = () => {
    const updateTrasactionRepository =
        new PostgresUpdateTransactionRepository();
    const getTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository();

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTrasactionRepository,
        getTransactionByIdRepository,
    );

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository =
        new PostgresDeleteTransactionRepository();

    const getTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository();

    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepository,
        getTransactionByIdRepository,
    );

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    );

    return deleteTransactionController;
};
