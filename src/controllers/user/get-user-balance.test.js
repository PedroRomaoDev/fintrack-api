import { faker } from '@faker-js/faker';
import { GetUserBalanceController } from './get-user-balance.js';
// import { UserNotFoundError } from '../../errors/user.js';

describe('GetUserBalance', () => {
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
});
