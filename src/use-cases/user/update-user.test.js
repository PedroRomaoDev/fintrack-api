import { faker } from '@faker-js/faker';
import { UpdateUserUseCase } from './update-user.js';
// import { EmailAlreadyInUseError } from '../../errors/user';
import { user } from '../../tests/index.js';

describe('UpdateUserUseCase', () => {
    class UpdateUserRepositoryStub {
        async execute() {
            return user;
        }
    }
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }
    class PasswordHasherAdapterStub {
        async execute() {
            return 'hashed_password';
        }
    }

    const makeSut = () => {
        const updateUserRepository = new UpdateUserRepositoryStub();
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
        const passwordHasherAdapter = new PasswordHasherAdapterStub();
        const sut = new UpdateUserUseCase(
            getUserByEmailRepository,
            updateUserRepository,
            passwordHasherAdapter,
        );

        return {
            sut,
            updateUserRepository,
            getUserByEmailRepository,
            passwordHasherAdapter,
        };
    };

    it('should update user succesfully (without email and password)', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(faker.string.uuid(), {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
        });

        // assert
        expect(result).toBe(user);
    });
    it('should update user succesfully (with email)', async () => {
        // arrange
        const { sut, getUserByEmailRepository } = makeSut();
        const getUserByEmailRepositorySpy = jest.spyOn(
            getUserByEmailRepository,
            'execute',
        );
        const email = faker.internet.email();

        // act
        const result = await sut.execute(faker.string.uuid(), { email });

        // assert
        expect(getUserByEmailRepositorySpy).toHaveBeenCalledWith(email);
        expect(result).toBe(user);
    });
});
