import User from '../../models/user.js';

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        return await User.findOne({
            where: {
                email,
            },
        });
    }
}
