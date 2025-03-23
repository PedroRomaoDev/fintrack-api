import express from 'express';
const routes = express.Router();
import OfxTransacaoController from '../OfxTransacoes/ofx-trasacoes.controller.js';

routes.post('/ofxtransacoes', OfxTransacaoController.criarTransacaoOfx);

// mudar futuramente, em vez de receber o id como params, recolher direntamente do JWT
routes.get(
    '/ofxtransacoes/:userId',
    OfxTransacaoController.buscarOfxTransacoesDoUsuario,
);

export default routes;
