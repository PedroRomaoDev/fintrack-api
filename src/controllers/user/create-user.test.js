import { CreateUserController } from './create-user.js';
import { faker } from '@faker-js/faker';

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
    it('returns 400 when email format is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: 'invalid email',
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('returns 400 when password is missing', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('returns 400 when password is less than 6 characters', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('calls CreateUserUseCase with correct parameters', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut();

        const executeSpy = jest.spyOn(createUserUseCase, 'execute'); // verifica se o use case está sendo chamado com os parâmetros esperados

        // act
        await sut.execute(httpRequest);

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });
    it('returns 500 if CreateUserUseCase throws a generic error', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut();

        jest.spyOn(createUserUseCase, 'execute').mockRejectedValue(new Error());

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(500);
    });
});
