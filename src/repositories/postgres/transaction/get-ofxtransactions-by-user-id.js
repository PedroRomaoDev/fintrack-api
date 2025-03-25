import OfxTransacao from '../../models/ofxTransaction.js';

export class PostgresGetTransactionByUserIdRepository {
    async execute(userId) {
        return await OfxTransacao.findAll({
            where: {
                user_id: userId,
            },
        });
    }
}
