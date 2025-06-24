import { InvalidPasswordError, UserNotFoundError } from '../../errors/user.js';

export class LoginUserUseCase {
    constructor(
        getUserByEmailRepository,
        passwordComparatorAdapter,
        tokenGeneratorAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordComparatorAdapter = passwordComparatorAdapter;
        this.tokenGeneratorAdapter = tokenGeneratorAdapter;
    }
    async execute(email, password) {
        // verificaremos se o e-mail é válido (se há usuário com esse e-mail)
        const user = await this.getUserByEmailRepository.execute(email);
        if (!user) {
            throw new UserNotFoundError();
        }

        // verificaremos se a senha recebida é válida (se a senha está correta)
        const isPasswordValid = await this.passwordComparatorAdapter.execute(
            password,
            user.password,
        );
        if (!isPasswordValid) {
            throw new InvalidPasswordError();
        }

     console.log(user)
    console.log( await this.tokenGeneratorAdapter.execute(user.id))

        // depois, gerar os tokens
        return {
            user: user,
            tokens: await this.tokenGeneratorAdapter.execute(user.id),
        };
    }
}
