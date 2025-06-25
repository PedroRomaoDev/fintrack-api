// import { UnauthorizedError } from '../../errors/index.js';
import { RefreshTokenController } from './refresh-token';

describe('RefreshTokenController', () => {
    class RefreshTokenUseCaseStub {
        execute() {
            return {
                accessToken: 'valid_access_token',
                refreshToken: 'valid_refresh_token',
            };
        }
    }
    const makeSut = () => {
        const refreshTokenUseCase = new RefreshTokenUseCaseStub();
        const sut = new RefreshTokenController(refreshTokenUseCase);
        return {
            refreshTokenUseCase,
            sut,
        };
    };
    it('should return 400 if refresh token is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                refreshToken: 2,
            },
        };
        const response = await sut.execute(httpRequest);
        expect(response.statusCode).toBe(400);
    });
});
