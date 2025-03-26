import User from '../../../../models/User.js';

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        console.log('Dados recebidos no repositorio:', createUserParams);
        const user = await User.create({
            id: createUserParams.id,
            email: createUserParams.email,
            first_name: createUserParams.first_name,
            last_name: createUserParams.last_name,
            password: createUserParams.password,
        });

        return user;
    }
}
