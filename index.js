// RAIZ DO PROJETO
import 'dotenv/config.js';
import express from 'express';
import sequelize from './config/db.js';
import { makeCreateUserController } from './src/factories/controllers/user.js';
//
async function testarConexao() {
    try {
        await sequelize.authenticate(); // Adicionei o `await` aqui
        console.log('Conexão estabelecida com banco de dados');
    } catch (err) {
        console.log('Erro ao conectar', err);
    }
}

testarConexao();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
