// RAIZ DO PROJETO
import 'dotenv/config.js';
import express from 'express';
import sequelize from './config/db.js';
import 'dotenv/config.js';
import {
    makeGetUserByIdController,
    makeCreateUserController,
    makeUpdateUserController,
    makeDeleteUserController,
} from './src/factories/controllers/user.js';

const app = express();

app.use(express.json());
//
async function testarConexao() {
    try {
        sequelize.authenticate();
        console.log('Conexão estabelecida com banco de dados');
    } catch (err) {
        console.log('Erro ao conectar', err);
    }
}
testarConexao();

app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController();

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
});

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController();

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = makeDeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(request);

    response.status(statusCode).send(body);
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () =>
    // eslint-disable-next-line no-undef
    console.log(`listening on port ${process.env.PORT}`),
);
