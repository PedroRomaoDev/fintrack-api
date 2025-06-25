import jwt from 'jsonwebtoken';
import { TokenGeneratorAdapter } from './token-generator.js';

jest.mock('jsonwebtoken');

describe('TokenGeneratorAdapter', () => {
    const userId = 'fake-user-id';
    const mockAccessToken = 'mock-access-token';
    const mockRefreshToken = 'mock-refresh-token';

    beforeEach(() => {
        jest.clearAllMocks();

        process.env.JWT_ACCESS_TOKEN_SECRET = 'access-secret';
        process.env.JWT_REFRESH_TOKEN_SECRET = 'refresh-secret';

        jwt.sign
            .mockReturnValueOnce(mockAccessToken)
            .mockReturnValueOnce(mockRefreshToken);
    });

    it('should generate access and refresh tokens correctly', () => {
        const sut = new TokenGeneratorAdapter();

        const result = sut.execute(userId);

        expect(jwt.sign).toHaveBeenCalledTimes(2);

        expect(jwt.sign).toHaveBeenCalledWith(
            { userId },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' },
        );

        expect(jwt.sign).toHaveBeenCalledWith(
            { userId },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' },
        );

        expect(result).toEqual({
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
        });
    });
});
