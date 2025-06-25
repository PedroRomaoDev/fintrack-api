import jwt from 'jsonwebtoken';
import { TokenVerifierAdapter } from './token-verifier.js';

jest.mock('jsonwebtoken');

describe('TokenVerifierAdapter', () => {
    const token = 'fake-jwt-token';
    const secret = 'jwt-secret';
    const decodedPayload = { userId: '123' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should verify the token and return the decoded payload', () => {
        jwt.verify.mockReturnValue(decodedPayload);

        const sut = new TokenVerifierAdapter();
        const result = sut.execute(token, secret);

        expect(jwt.verify).toHaveBeenCalledWith(token, secret);
        expect(result).toEqual(decodedPayload);
    });

    it('should throw an error if token is invalid', () => {
        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const sut = new TokenVerifierAdapter();

        expect(() => sut.execute(token, secret)).toThrow('Invalid token');
    });
});
