import jwt from 'jsonwebtoken';
import { auth } from './auth';

describe('Auth middleware', () => {
    const secret = 'test-secret';
    const userId = 'user123';
    let originalEnv;

    beforeAll(() => {
        originalEnv = process.env.JWT_ACCESS_TOKEN_SECRET;
        process.env.JWT_ACCESS_TOKEN_SECRET = secret;
    });

    afterAll(() => {
        process.env.JWT_ACCESS_TOKEN_SECRET = originalEnv;
    });

    it('deve chamar next() com token válido', () => {
        const token = jwt.sign({ userId }, secret);
        const req = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.userId).toBe(userId);
        expect(next).toHaveBeenCalled();
    });
});
