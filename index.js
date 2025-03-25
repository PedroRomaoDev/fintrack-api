// RAIZ DO PROJETO
import 'dotenv/config.js';
import express from 'express';
import sequelize from './config/db.js';
import 'dotenv/config.js';
import { makeCreateUserController } from './src/factories/controllers/user.js';

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
// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () =>
    // eslint-disable-next-line no-undef
    console.log(`listening on port ${process.env.PORT}`),
);
