import User from '../../../../models/User.js';

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        await User.update(updateUserParams, {
            where: { id: userId },
        });

        return await User.findByPk(userId); // Retorna o usuário atualizado
    }
}
