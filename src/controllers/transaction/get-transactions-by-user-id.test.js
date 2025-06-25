import { faker } from '@faker-js/faker';
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js';
// import { UserNotFoundError } from '../../errors/user';
import { transaction } from '../../tests/index.js';

describe('GetTransactionsByUserIdController', () => {
    const from = '2024-02-01';
    const to = '2024-02-28';

    class GetTransactionsByUserIdUseCaseStub {
        // eslint-disable-next-line no-unused-vars
        async execute(userId, from, to) {
            return [transaction]; // ou [] se quiser testar array vazio
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdUseCase =
            new GetTransactionsByUserIdUseCaseStub();
        const sut = new GetTransactionsByUserIdController(
            getTransactionsByUserIdUseCase,
        );

        return { sut, getTransactionsByUserIdUseCase };
    };

    it('should return 200 when finding transaction by user id succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            query: { userId: faker.string.uuid(), from, to },
        });

        // assert
        expect(result.statusCode).toBe(200);
    });
});
