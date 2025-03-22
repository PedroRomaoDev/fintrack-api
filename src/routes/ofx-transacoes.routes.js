import express from 'express';
const routes = express.Router();
import OfxTransacaoController from '../ofxTransacoes/ofx-trasacoes.controller.js';

routes.get(
    '/ofxtransacoes:idUsuario',
    OfxTransacaoController.buscarOfxTransacoesDoUsuario,
);

export default routes;
