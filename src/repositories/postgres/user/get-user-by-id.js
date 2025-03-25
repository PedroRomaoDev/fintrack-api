import User from '../../../../models/User.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        return await User.findOne({
            where: {
                id: userId,
            },
        });
    }
}
