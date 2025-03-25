import User from '../../../../models/User.js';

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        return await User.findOne({
            where: {
                email,
            },
        });
    }
}
