import User from '../../models/user.js';

export class PostgresDeleteUserRepository {
    async execute(userId) {
        try {
            const deletedUser = await User.findByPk(userId);
            if (!deletedUser) return null;

            await User.destroy({
                where: { id: userId },
            });

            return deletedUser; // Retorna os dados do usuário deletado
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
