import { faker } from '@faker-js/faker';
import { GetUserBalanceUseCase } from './get-user-balance.js';
import { UserNotFoundError } from '../../errors/user';
import { userBalance, user } from '../../tests/index.js';

describe('GetUserBalanceUseCase', () => {
    const from = '2024-01-01';
    const to = '2024-12-31';
    class getUserBalanceRepositoryStub {
        async execute() {
            return userBalance;
        }
    }
    class getUserByIdRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getUserBalanceRepository = new getUserBalanceRepositoryStub();
        const getUserByIdRepository = new getUserByIdRepositoryStub();
        const sut = new GetUserBalanceUseCase(
            getUserBalanceRepository,
            getUserByIdRepository,
        );
        return { sut, getUserBalanceRepository, getUserByIdRepository };
    };

    it('should get user balance succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(faker.string.uuid(), from, to);

        // assert
        expect(result).toEqual(userBalance);
    });
    it('should throw UserNotFoundError if GetUserByIdRepository returns null', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValue(null);
        const userId = faker.string.uuid();

        // act
        const promise = sut.execute(userId, from, to);

        // assert
        await expect(promise).rejects.toThrow(new UserNotFoundError(userId));
    });
    it('should call GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        const getUserBydRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        );
        const userId = faker.string.uuid();

        // act
        await sut.execute(userId, from, to);

        // assert
        expect(getUserBydRepositorySpy).toHaveBeenCalledWith(userId);
    });
});
