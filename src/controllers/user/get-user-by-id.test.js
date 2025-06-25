import { faker } from '@faker-js/faker';
import { GetUserByIdController } from './get-user-by-id.js';
import { user } from '../../tests/index.js';

describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        //Sut = suits under test
        const getUserByIdUseCase = new GetUserByIdUseCaseStub();
        const sut = new GetUserByIdController(getUserByIdUseCase);
        return { getUserByIdUseCase, sut };
    };

    const baseHttpRequest = {
        params: { userId: faker.string.uuid() },
    };

    it('should return 200 if user is found', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(baseHttpRequest);

        // assert
        expect(result.statusCode).toBe(200);
    });
    it('should return 400 if an invalid id is provided', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: { userId: 'invalid id' },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('should return 404 if a user not found', async () => {
        // arrange
        const { sut, getUserByIdUseCase } = makeSut();
        jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(null);

        // act
        const result = await sut.execute(baseHttpRequest);

        // assert
        expect(result.statusCode).toBe(404);
    });
    it('should return 500 if GetUserByIdUseCase throws an error', async () => {
        // arrange
        const { sut, getUserByIdUseCase } = makeSut();
        jest.spyOn(getUserByIdUseCase, 'execute').mockRejectedValue(
            new Error(),
        );

        // act
        const result = await sut.execute(baseHttpRequest);

        // assert
        expect(result.statusCode).toBe(500);
    });
    it('should call GetUserByIdUseCase with correct params', async () => {
        // arrange
        const { sut, getUserByIdUseCase } = makeSut();
        const executeSpy = jest.spyOn(getUserByIdUseCase, 'execute');

        // act
        await sut.execute(baseHttpRequest);

        // assert
        expect(executeSpy).toHaveBeenCalledWith(baseHttpRequest.params.userId);
    });
});
