import { CreateTransactionUseCase } from './create-transaction.js';
// import { UserNotFoundError } from '../../errors/user';
import { transaction, user } from '../../tests/index.js';

describe('CreateTransactionUseCase', () => {
    class CreateTransactionRepositoryStub {
        async execute() {
            return transaction;
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'random_id';
        }
    }

    class GetUserByIdRepositoryStub {
        async execute(userId) {
            return { ...user, id: userId };
        }
    }

    const createTransactionParams = {
        ...transaction,
        id: undefined,
    };

    const makeSut = () => {
        const createTransactionRepository =
            new CreateTransactionRepositoryStub();
        const idGeneratorAdapter = new IdGeneratorAdapterStub();
        const getUserByIdRepository = new GetUserByIdRepositoryStub();
        const sut = new CreateTransactionUseCase(
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        );

        return {
            sut,
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        };
    };

    it('should create transaction successfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(createTransactionParams);

        // assert
        expect(result).toEqual(transaction);
    });
});
