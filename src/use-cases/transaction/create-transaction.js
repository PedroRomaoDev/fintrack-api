import { UserNotFoundError } from '../../errors/user.js';

export class CreateTransactionUseCase {
    constructor(
        createTransactionRepository,
        getUserByIdRepository,
        idGeneratorAdapter,
    ) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
        this.idGeneratorAdapter = idGeneratorAdapter;
    }

    async execute(createTransactionParams) {
        console.log('Parâmetros recebidos:', createTransactionParams); // <-- estava debugando
        // validar se o usuario existe
        const userId = createTransactionParams.user_id;

        console.log('Buscando usuário com ID:', userId);

        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        //criar ID da transaction
        const transactionId = this.idGeneratorAdapter.execute();

        // criar transação
        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        });
        return transaction;
    }
}
