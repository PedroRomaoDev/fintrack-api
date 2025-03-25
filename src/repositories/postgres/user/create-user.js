import User from '../../../../models/User.js';

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        // Verificar se createUserParams contém os dados necessários.

        console.log('📌 Dados recebidos no repositório:', createUserParams);

        // Criar o usuário no banco de dados
        try {
            const user = await User.create({
                first_name: createUserParams.first_name,
                last_name: createUserParams.last_name,
                email: createUserParams.email,
                password: createUserParams.password,
            });

            return user;
        } catch (error) {
            console.error('Erro ao criar usuário no banco de dados:', error);
            throw error;
        }
    }
}
