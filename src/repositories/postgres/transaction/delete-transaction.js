import OfxTransacao from '../../models/ofxTransaction.js';

export class PostgresDeleteTransactionRepository {
    async execute(transactionId) {
        try {
            const deletedTransaction =
                await OfxTransacao.findByPk(transactionId);
            if (!deletedTransaction) return null;

            await OfxTransacao.destroy({
                where: { id: transactionId },
            });

            return deletedTransaction;
        } catch (error) {
            console.error('Erro ao deletar transação:', error);
            return null;
        }
    }
}
