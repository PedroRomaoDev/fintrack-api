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

    it('returns 400 when first_name is missing', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                first_name: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('returns 400 when last_name is missing', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                last_name: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('returns 400 when email is missing', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
});
