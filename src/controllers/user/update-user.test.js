import { faker } from '@faker-js/faker';
import { UpdateUserController } from './update-user.js';
// import {
//     EmailAlreadyInUseError,
//     UserNotFoundError,
// } from '../../errors/user.js';
import { user } from '../../tests/index.js';

describe('UpdateUserController', () => {
    class UpdateUserUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        //Sut = suits under test
        const updateUserUseCase = new UpdateUserUseCaseStub();
        const sut = new UpdateUserController(updateUserUseCase);
        return { updateUserUseCase, sut };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    };

    it('should return 200 when updating a user succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(200);
    });
    it('should return 400 when invalid email is provided', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest,
                email: 'invalid_email',
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('should return 400 when invalid password is provided', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
    it('should return 400 when an invalid id is provided', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: {
                userId: 'invalid id',
            },
            body: httpRequest.body,
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
});
