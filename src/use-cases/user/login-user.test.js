import { LoginUserUseCase } from './login-user';
import { user } from '../../tests/fixtures/user.js';
import { InvalidPasswordError, UserNotFoundError } from '../../errors/user';

describe('LoginUserUseCase', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return user;
        }
    }

    class PasswordComparatorAdapterStub {
        async execute() {
            return true;
        }
    }

    class TokensGeneratorAdapterStub {
        execute() {
            return {
                accessToken: 'any_access_token',
                refreshToken: 'any_refresh_token',
            };
        }
    }

    const makeSut = () => {
        const getUserByEmailRepositoryStub = new GetUserByEmailRepositoryStub();
        const passwordComparatorAdapterStub =
            new PasswordComparatorAdapterStub();
        const tokensGeneratorAdapterStub = new TokensGeneratorAdapterStub();
        const sut = new LoginUserUseCase(
            getUserByEmailRepositoryStub,
            passwordComparatorAdapterStub,
            tokensGeneratorAdapterStub,
        );

        return {
            sut,
            getUserByEmailRepositoryStub,
            passwordComparatorAdapterStub,
            tokensGeneratorAdapterStub,
        };
    };

    it('should throw UserNotFoundError if user is not found', async () => {
        //arrange
        const { sut, getUserByEmailRepositoryStub } = makeSut();
        jest.spyOn(
            getUserByEmailRepositoryStub,
            'execute',
        ).mockResolvedValueOnce(null);

        //act
        const promise = sut.execute('any_email', 'any_password');

        //assert
        expect(promise).rejects.toThrow(new UserNotFoundError());
    });
    it('should throw InvalidPasswordError if password is invalid', async () => {
        //arrange
        const { sut, passwordComparatorAdapterStub } = makeSut();
        jest.spyOn(
            passwordComparatorAdapterStub,
            'execute',
        ).mockReturnValueOnce(false);

        //act
        const promise = sut.execute('any_email', 'any_password');

        //assert
        expect(promise).rejects.toThrow(new InvalidPasswordError());
    });
    it('should return user with tokens', async () => {
        //arrange
        const { sut } = makeSut();

        //act
        const result = await sut.execute('any_email', 'any_password');

        //assert
        expect(result.tokens.accessToken).toBeDefined();
    });
});
