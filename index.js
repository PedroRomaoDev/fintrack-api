// RAIZ DO PROJETO
import 'dotenv/config.js';
import express from 'express';
import { makeCreateUserController } from './src/factories/controllers/user.js';

//

const app = express();

app.use(express.json());

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
