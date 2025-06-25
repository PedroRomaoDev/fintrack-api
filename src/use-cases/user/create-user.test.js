import { faker } from '@faker-js/faker';
import { CreateUserUseCase } from './create-user.js';
import { EmailAlreadyInUseError } from '../../errors/user.js';
import { user as fixtureUser } from '../../tests/index.js';

describe('CreateUserUseCase', () => {
    const user = {
        ...fixtureUser,
        id: undefined,
    };
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }

    class CreateUserRepositoryStub {
        async execute() {
            return user;
        }
    }

    class passwordHasherAdapterStub {
        async execute() {
            return 'hashed_password';
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id';
        }
    }

    class TokenGeneratorAdapter {
        execute() {
            return {
                accessToken: 'generated_access_token',
                refreshToken: 'generated_refresh_token',
            };
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
        const createUserRepository = new CreateUserRepositoryStub();
        const passwordHasherAdapter = new passwordHasherAdapterStub();
        const idGeneratorAdapter = new IdGeneratorAdapterStub();
        const tokenGeneratorAdapter = new TokenGeneratorAdapter();

        const sut = new CreateUserUseCase(
            getUserByEmailRepository,
            createUserRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
            tokenGeneratorAdapter,
        );

        return {
            sut,
            getUserByEmailRepository,
            createUserRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
            tokenGeneratorAdapter,
        };
    };

    it('should succesfully create a user', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const createdUser = await sut.execute({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        });

        // assert
        expect(createdUser).toBeTruthy();
        expect(createdUser.tokens.accessToken).toBeDefined();
        expect(createdUser.tokens.refreshToken).toBeDefined();
    });
    it('should throw an EmailAlrealdyInUseError if GetUserByEmailRepository not returns a user', async () => {
        // arrange
        const { sut, getUserByEmailRepository } = makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockReturnValueOnce(
            user,
        );

        // act
        const promise = sut.execute(user);

        // assert
        await expect(promise).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        );
    });
    it('should call IdGeneratorAdapter to generate a random id', async () => {
        // arrange
        const { sut, idGeneratorAdapter, createUserRepository } = makeSut();

        const idGeneratorSpy = jest.spyOn(idGeneratorAdapter, 'execute');
        const createUserRepositorySpy = jest.spyOn(
            createUserRepository,
            'execute',
        );

        // act
        await sut.execute(user);

        // assert
        expect(idGeneratorSpy).toHaveBeenCalled();
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            password: 'hashed_password',
            id: 'generated_id',
        });
    });

    it('should call PasswordHasherAdapter to cryptograph password', async () => {
        // arrange
        const { sut, createUserRepository, passwordHasherAdapter } = makeSut();
        const passwordHasherSpy = jest.spyOn(passwordHasherAdapter, 'execute');

        const createUserRepositorySpy = jest.spyOn(
            createUserRepository,
            'execute',
        );

        // act
        await sut.execute(user);

        // assert
        expect(passwordHasherSpy).toHaveBeenCalledWith(user.password);
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            password: 'hashed_password',
            id: 'generated_id',
        });
    });
    it('should throw if GetUserByEmailRepository throws', async () => {
        // arrange
        const { sut, getUserByEmailRepository } = makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        // act
        const promise = sut.execute(user);

        // assert
        await expect(promise).rejects.toThrow();
    });
});
