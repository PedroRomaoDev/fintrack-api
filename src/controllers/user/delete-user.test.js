import { faker } from '@faker-js/faker';
import { DeleteUserController } from './delete-user.js';
import { user } from '../../tests/index.js';
import { UserNotFoundError } from '../../errors/user.js';

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
    it('should return 400 if id is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({ params: { userId: 'invalid_id' } });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('should return 404 if user is not found', async () => {
        // arrange
        const { sut, deleteUserUseCase } = makeSut();
        jest.spyOn(deleteUserUseCase, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(),
        );

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(404);
    });
});
