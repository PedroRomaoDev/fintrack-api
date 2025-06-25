import { faker } from '@faker-js/faker';
import { DeleteUserController } from './delete-user.js';
import { user } from '../../tests/index.js';

describe('DeleteUserController', () => {
    class DeleteUserUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        //Sut = suits under test
        const deleteUserUseCase = new DeleteUserUseCaseStub();
        const sut = new DeleteUserController(deleteUserUseCase);
        return { deleteUserUseCase, sut };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    };

    it('should return 200 if user is deleted', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(200);
    });
});
