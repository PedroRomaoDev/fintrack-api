import ofxTrasacaoService from './ofx-transacoes.service.js';

const criarTransacaoOfx = async (req) => {
    console.log('Esse é o valor do req.body: ', req.body);
    const novaTransacaoOfx = await ofxTrasacaoService.criarTransacaoOfx(
        req.body,
    );
    return novaTransacaoOfx;
};

const buscarOfxTransacoesDoUsuario = async (req, res) => {
    try {
        const transacoes =
            await ofxTrasacaoService.listarTodasTransacoesDoUsuario(
                req.params.userId,
            );

        if (!transacoes) {
            return res
                .status(500)
                .json({ message: 'Erro ao buscar transações' });
        }

        return res.status(200).json(transacoes);
    } catch (err) {
        console.error('Erro na requisição:', err);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};

export default { buscarOfxTransacoesDoUsuario, criarTransacaoOfx };
