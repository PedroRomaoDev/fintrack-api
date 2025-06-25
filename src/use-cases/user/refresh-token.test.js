// import { UnauthorizedError } from '../../errors';
import { RefreshTokenUseCase } from './refresh-token';

describe('RefreshTokenUseCase', () => {
    class TokenVerifierAdapter {
        execute() {
            return true;
        }
    }
    class TokensGeneratorAdapter {
        execute() {
            return {
                accessToken: 'any_access_token',
                refreshToken: 'any_refresh_token',
            };
        }
    }
    const makeSut = () => {
        const tokenVerifierAdapter = new TokenVerifierAdapter();
        const tokensGeneratorAdapter = new TokensGeneratorAdapter();
        const sut = new RefreshTokenUseCase(
            tokensGeneratorAdapter,
            tokenVerifierAdapter,
        );
        return {
            sut,
            tokenVerifierAdapter,
            tokensGeneratorAdapter,
        };
    };

    it('should return new tokens', () => {
        const { sut } = makeSut();
        const refreshToken = 'any_refresh_token';
        const result = sut.execute(refreshToken);
        expect(result).toEqual({
            accessToken: 'any_access_token',
            refreshToken: 'any_refresh_token',
        });
    });
});
