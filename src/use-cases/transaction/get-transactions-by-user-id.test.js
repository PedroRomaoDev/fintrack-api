import { faker } from '@faker-js/faker';
import { GetTransactionsByUserIdUseCase } from './get-transactions-by-user-id.js';
import { UserNotFoundError } from '../../errors/user.js';
import { user } from '../../tests/index.js';

describe('GetTransactionsByUserIdUseCase', () => {
    class GetTransactionsByUserIdRepositoryStub {
        async execute() {
            return [];
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdRepository =
            new GetTransactionsByUserIdRepositoryStub();
        const getUserByIdRepository = new GetUserByIdRepositoryStub();
        const sut = new GetTransactionsByUserIdUseCase(
            getTransactionsByUserIdRepository,
            getUserByIdRepository,
        );

        return {
            sut,
            getTransactionsByUserIdRepository,
            getUserByIdRepository,
        };
    };

    it('should get transactions by user id successfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(faker.string.uuid());

        // assert
        expect(result).toEqual([]);
    });
    it('should throw UserNotFoundError if user not exists', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(
            null,
        );
        const id = faker.string.uuid();

        // act
        const promise = sut.execute(id);

        // assert
        await expect(promise).rejects.toThrow(new UserNotFoundError(id));
    });
    it('should call GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        );
        const id = faker.string.uuid();

        // act
        await sut.execute(id);

        // assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(id);
    });
    it('should call GetTransactionsByUserIdRepository with correct params', async () => {
        // arrange
        const { sut, getTransactionsByUserIdRepository } = makeSut();
        const getTransactionsByUserIdRepositorySpy = jest.spyOn(
            getTransactionsByUserIdRepository,
            'execute',
        );
        const id = faker.string.uuid();
        const from = '2023-01-01';
        const to = '2023-12-31';

        // act
        await sut.execute(id, from, to);

        // assert
        expect(getTransactionsByUserIdRepositorySpy).toHaveBeenCalledWith(
            id,
            from,
            to,
        );
    });
    it('should call throw if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        );
        const id = faker.string.uuid();

        // act
        const promise = sut.execute(id);

        // assert
        await expect(promise).rejects.toThrow();
    });
    it('should call throw if GetTransactionsByUserIdRepository throws', async () => {
        // arrange
        const { sut, getTransactionsByUserIdRepository } = makeSut();
        jest.spyOn(
            getTransactionsByUserIdRepository,
            'execute',
        ).mockRejectedValueOnce(new Error());
        const id = faker.string.uuid();

        // act
        const promise = sut.execute(id);

        // assert
        await expect(promise).rejects.toThrow();
    });
});
