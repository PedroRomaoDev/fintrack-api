import { EmailAlreadyInUseError } from '../../errors/user.js';

export class CreateUserUseCase {
    constructor(
        getUserByEmailRepository,
        createUserRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
        tokenGeneratorAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
        this.idGeneratorAdapter = idGeneratorAdapter;
        this.tokenGeneratorAdapter = tokenGeneratorAdapter;
    }
    async execute(createUserParams) {
        //verificar se o email já está em uso

        const userWithProviderEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email);

        if (userWithProviderEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        //gerar ID do usuario com UUID
        const userId = this.idGeneratorAdapter.execute();

        //criptografar a senha com Bcrypt
        const hashedPassword = await this.passwordHasherAdapter.execute(
            createUserParams.password,
        );

        //inserir usuario no banco de dados
        const user = {
            ...createUserParams, //firstName, lastName, email...estão inclusos aqui
            id: userId,
            password: hashedPassword,
        };
        // chamar o repositorio

        const createdUser = await this.createUserRepository.execute(user);

        return {
            ...createdUser,
            tokens: this.tokenGeneratorAdapter.execute(userId),
        };
    }
}
