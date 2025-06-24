import jwt from 'jsonwebtoken';

export class TokenGeneratorAdapter {
    execute(userId) {
        if (!process.env.JWT_ACCESS_TOKEN_SECRET || !process.env.JWT_REFRESH_TOKEN_SECRET) {
            throw new Error('JWT secrets are not defined in environment variables.');
        }

        const accessToken = jwt.sign(
            { userId },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        );

        return { accessToken, refreshToken };
    }
}
