import { CreateUserController } from './create-user.js';

import { user } from '../../tests/index.js';

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        // Sut = system under test
        const createUserUseCase = new CreateUserUseCaseStub();
        const sut = new CreateUserController(createUserUseCase);
        return { createUserUseCase, sut };
    };

    const httpRequest = {
        body: {
            ...user,
            id: undefined,
        },
    };

    it('returns 201 when a user is successfully created', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(user);
    });
});
