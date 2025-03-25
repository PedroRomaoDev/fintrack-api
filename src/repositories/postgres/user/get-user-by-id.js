import User from '../../models/user.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        return await User.findOne({
            where: {
                id: userId,
            },
        });
    }
}
