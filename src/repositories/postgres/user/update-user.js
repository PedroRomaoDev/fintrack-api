import User from '../../models/user.js';

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        await User.update(updateUserParams, {
            where: { id: userId },
        });

        return await User.findByPk(userId); // Retorna o usuário atualizado
    }
}
