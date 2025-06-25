import { UserNotFoundError } from '../../errors/user.js';

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }
    async execute(userId, from, to) {
        //validar se o usuario existe
        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        //se existe, chamar o repository
        const transactions =
            await this.getTransactionsByUserIdRepository.execute(
                userId,
                from,
                to,
            );

        return transactions;
    }
}
