import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../../errors/user.js';

export class CreateUserUseCase {
    constructor(createUserRepository, getUserByEmailRepository) {
        this.createUserRepository = createUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }
    async execute(createUserParams) {
        console.log('🔧 Dados recebidos no use case:', createUserParams); // Verificar se os dados chegaram aqui

        //verificar se o email já está em uso
        const userWithProviderEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email);

        if (userWithProviderEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        // gerar ID do usuario com UUID
        const userId = uuidv4();

        // criptografar senha com Bcrypt
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // inserir usuario no banco de dados
        const user = {
            ...createUserParams, //firstName, lastName, email...estão inclusos aqui
            id: userId,
            password: hashedPassword,
        };

        // chamar o repositorio
        const createdUser = await this.createUserRepository.execute(user);

        return createdUser;
    }
}
