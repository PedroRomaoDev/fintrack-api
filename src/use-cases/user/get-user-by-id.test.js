import { faker } from '@faker-js/faker';
import { GetUserByIdUseCase } from './get-user-by-id.js';
import { user } from '../../tests/index.js';

describe('GetUserByIdUseCase', () => {
    class GetUserByIdReposityStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getUserByIdRepository = new GetUserByIdReposityStub();
        const sut = new GetUserByIdUseCase(getUserByIdRepository);

        return { sut, getUserByIdRepository };
    };

    it('should get user by id succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(faker.string.uuid());

        // assert
        expect(result).toEqual(user);
    });
    it('should call GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        );
        const userId = faker.string.uuid();

        // act
        await sut.execute(userId);

        // assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(userId);
    });
    it('should throw if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValue(
            new Error(),
        );
        const userId = faker.string.uuid();

        // act
        const promise = sut.execute(userId);

        // assert
        await expect(promise).rejects.toThrow();
    });
});
