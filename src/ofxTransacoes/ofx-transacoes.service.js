import OfxTransacao from '../../models/ofxTransaction.js';

const listarTodasTransacoesDoUsuario = async (id) => {
    return await OfxTransacao.findAll({
        where: {
            trasacaoofx_id: id,
        },
    });
};

export default { listarTodasTransacoesDoUsuario };
