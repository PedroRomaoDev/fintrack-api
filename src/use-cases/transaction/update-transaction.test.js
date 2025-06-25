import { faker } from '@faker-js/faker';
import { UpdateTransactionUseCase } from './update-transaction';
import { transaction } from '../../tests';

describe('UpdateTransactionUseCase', () => {
    class UpdateTransactionRepositoryStub {
        async execute() {
            return transaction;
        }
    }

    class GetTransactionByIdStub {
        async execute() {
            return transaction;
        }
    }

    const makeSut = () => {
        const updateTransactionRepository =
            new UpdateTransactionRepositoryStub();
        const getTransactionById = new GetTransactionByIdStub();
        const sut = new UpdateTransactionUseCase(
            updateTransactionRepository,
            getTransactionById,
        );

        return {
            sut,
            updateTransactionRepository,
        };
    };

    it('should create a transaction successfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(transaction.id, {
            amount: Number(faker.finance.amount()),
        });

        // assert
        expect(result).toEqual(transaction);
    });
});
