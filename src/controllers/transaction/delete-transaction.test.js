// import { TransactionNotFoundError } from '../../errors';
import { transaction } from '../../tests';
import { DeleteTransactionController } from './delete-transaction';
import { faker } from '@faker-js/faker';

describe('Delete Transaction Controller', () => {
    class DeleteTransactionUseCaseStub {
        async execute() {
            return transaction;
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCase = new DeleteTransactionUseCaseStub();
        const sut = new DeleteTransactionController(deleteTransactionUseCase);

        return { sut, deleteTransactionUseCase };
    };
    it('should return 200 when deleting a transaction successfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const response = await sut.execute({
            params: {
                transactionId: faker.string.uuid(),
                user_id: faker.string.uuid(),
            },
        });

        // assert
        expect(response.statusCode).toBe(200);
    });
    it('should return 400 when id is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const response = await sut.execute({
            params: { transactionId: 'invalid_id', user_id: 'invalid_id' },
        });

        // assert
        expect(response.statusCode).toBe(400);
    });
});
