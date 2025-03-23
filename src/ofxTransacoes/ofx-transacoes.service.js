import OfxTransacao from '../../models/ofxTransaction.js';

const criarTransacaoOfx = async (body) => {
    const { user_id, tipo, valor, data, descricao, ofx_imported } = body;
    try {
        const novaTransacaoOfx = await OfxTransacao.create({
            user_id: user_id,
            tipo: tipo,
            valor: valor,
            data: data || new Date(),
            descricao: descricao,
            ofx_imported: ofx_imported ?? false,
        });

        return novaTransacaoOfx;
    } catch (err) {
        console.log('Esse foi o erro ao criar transacao ofx: ', err);
        return null;
    }
};

const listarTodasTransacoesDoUsuario = async (id) => {
    try {
        console.log(`Buscando transações do usuário: ${id}`);

        const transacoes = await OfxTransacao.findAll({
            where: { user_id: id },
        });

        console.log(`Transações encontradas: ${transacoes.length}`);
        return transacoes;
    } catch (err) {
        console.error('Erro ao buscar transações: ', err);
        return null;
    }
};

export default { listarTodasTransacoesDoUsuario, criarTransacaoOfx };
