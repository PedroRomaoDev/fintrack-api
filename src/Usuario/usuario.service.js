import User from '../../models/User.js';
import ServicesRoot from '../ServicesRoot/seguranca.service.js';

const criarUsuario = async (body) => {
    const { first_name, last_name, email, password } = body;

    /**usamos para encriptar a senha*/
    const passwordEncript = await ServicesRoot.gerarHashSenha(password);

    try {
        const novoUsuario = User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: passwordEncript,
        });

        return novoUsuario;
    } catch (err) {
        console.log('Opa, esse foi o erro ao criar usuario: ', err);
        return null;
    }
};

// ATENÇÃO ESSA FUNÇÃO SÓ DEVE SER USADA NO DESENVOLVIMENTO
const buscarTodosUsuarios = async () => {
    const usuarios = User.findAll();
    return usuarios;
};

export default { criarUsuario, buscarTodosUsuarios };
