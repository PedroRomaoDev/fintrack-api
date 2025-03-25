import OfxTransacao from '../../../../models/ofxTransaction.js';

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        return await OfxTransacao.create({
            user_id: createTransactionParams.user_id,
            tipo: createTransactionParams.tipo,
            valor: createTransactionParams.valor,
            data: createTransactionParams.data || new Date(),
            descricao: createTransactionParams.descricao,
            ofx_imported: createTransactionParams.ofx_imported ?? false,
        });
    }
}
