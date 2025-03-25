// RAIZ DO PROJETO
import 'dotenv/config.js';
import express from 'express';
import sequelize from './config/db.js';
import trasacoesRoutes from './src/routes/ofx-transacoes.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';

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

app.use('/api', trasacoesRoutes);
app.use('/api', usuarioRoutes);

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () =>
    // eslint-disable-next-line no-undef
    console.log(`listening on port ${process.env.PORT}`),
);
