import { faker } from '@faker-js/faker';
import { DeleteUserUseCase } from './delete-user.js';
import { user } from '../../tests/index.js';

describe('DeleteUserUseCase', () => {
    class DeleteUserRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const deleteUserRepository = new DeleteUserRepositoryStub();
        const sut = new DeleteUserUseCase(deleteUserRepository);

        return {
            sut,
            deleteUserRepository,
        };
    };

    it('should succesfully delete a user', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const deletedUser = await sut.execute(faker.string.uuid());

        // assert
        expect(deletedUser).toEqual(user);
    });
});
