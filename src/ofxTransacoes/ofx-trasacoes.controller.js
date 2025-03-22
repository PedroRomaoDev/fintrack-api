import ofxTrasacaoService from './ofx-transacoes.service.js';

const buscarOfxTransacoesDoUsuario = async (req) => {
    console.log('Esse é o valor de res: ', req);
    return await ofxTrasacaoService.listarTodasTransacoesDoUsuario(
        req.params.id,
    );
};

export default { buscarOfxTransacoesDoUsuario };
