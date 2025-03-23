import UsuarioService from './usuario.service.js';

const criarUsuario = async (req, res) => {
    const novoUsuario = await UsuarioService.criarUsuario(req.body);
    res.json({ resposta: novoUsuario });
};

// ATENÇÃO ESSA FUNÇÃO SÓ DEVE SER USADA NO DESENVOLVIMENTO
const buscarTodosUsuarios = async (req, res) => {
    const todosUsuarios = await UsuarioService.buscarTodosUsuarios();
    res.json({ resposta: todosUsuarios });
};

export default { criarUsuario, buscarTodosUsuarios };
