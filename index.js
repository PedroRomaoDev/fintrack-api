// RAIZ DO PROJETO
import 'dotenv/config.js';
import express from 'express';

const app = express();

app.use(express.json());

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () =>
    // eslint-disable-next-line no-undef
    console.log(`listening on port ${process.env.PORT}`),
);
