import OfxTransacao from '../../models/ofxTransaction.js';

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        await OfxTransacao.update(updateTransactionParams, {
            where: { id: transactionId },
        });

        return await OfxTransacao.findByPk(transactionId); // Retorna a transação atualizada
    }
}
