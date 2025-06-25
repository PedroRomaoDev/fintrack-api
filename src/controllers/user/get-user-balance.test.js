import { faker } from '@faker-js/faker';
import { GetUserBalanceController } from './get-user-balance.js';
// import { UserNotFoundError } from '../../errors/user.js';

describe('Get User Balance Controller', () => {
    class GetUserBalanceUseCaseStub {
        async execute() {
            return faker.number.int();
        }
    }

    const makeSut = () => {
        //Sut = suits under test
        const getUserBalanceUseCase = new GetUserBalanceUseCaseStub();
        const sut = new GetUserBalanceController(getUserBalanceUseCase);
        return { getUserBalanceUseCase, sut };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        query: {
            from: '2024-01-01',
            to: '2024-12-31',
        },
    };

    it('should return 200 when getting user balance', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(200);
    });
    it('should return 400 when userId is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: { userId: 'invalid_id' },
            query: {
                from: '2024-01-01',
                to: '2024-12-31',
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('should return 500 if GetUserBalanceUseCase throws', async () => {
        // arrange
        const { sut, getUserBalanceUseCase } = makeSut();
        jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        ); // rejeito uma promise, como se estivesse com um 'throw'

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(500);
    });
});
