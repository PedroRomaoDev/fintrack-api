import { CreateTransactionController } from './create-transaction.js';
import { transaction } from '../../tests/index.js';

describe('CreateTransactionController', () => {
    class CreateTransactionUseCaseStub {
        async execute() {
            return transaction;
        }
    }

    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub();
        const sut = new CreateTransactionController(createTransactionUseCase);

        return {
            sut,
            createTransactionUseCase,
        };
    };

    const baseHttpRequest = {
        body: {
            ...transaction,
            id: undefined,
        },
    };

    it('should return 201 when creating transaction succesfully {expense}', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(baseHttpRequest);

        // assert
        expect(result.statusCode).toBe(201);
    });
    it('should return 201 when creating transaction succesfully {earning}', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...baseHttpRequest.body,
                type: 'EARNING',
            },
        });

        // assert
        expect(result.statusCode).toBe(201);
    });
    it('should return 201 when creating transaction succesfully {investment}', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...baseHttpRequest.body,
                type: 'INVESTMENT',
            },
        });

        // assert
        expect(result.statusCode).toBe(201);
    });
    it('should return 400 when missing user_id', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...baseHttpRequest.body,
                user_id: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
});
