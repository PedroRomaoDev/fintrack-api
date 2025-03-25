import User from '../../../../models/User.js';

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const user = await User.create({
            first_name: createUserParams.first_name,
            last_name: createUserParams.last_name,
            email: createUserParams.email,
            password: createUserParams.password,
        });
        return user;
    }
}
