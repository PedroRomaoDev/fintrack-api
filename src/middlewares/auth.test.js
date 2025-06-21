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

    it('deve retornar 401 se o token não for fornecido', () => {
        const req = { headers: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const next = jest.fn();

        auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });
});
