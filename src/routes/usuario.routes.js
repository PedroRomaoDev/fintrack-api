import express from 'express';
const routes = express.Router();
import UsuarioController from '../Usuario/usuario.controller.js';

routes.post('/usuario', UsuarioController.criarUsuario);

// ATENÇÃO ESSA ROTA SÓ DEVE SER USADA NO DESENVOLVIMENTO
routes.get('/usuario/todos', UsuarioController.buscarTodosUsuarios);

export default routes;
