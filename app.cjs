const express = require('express');
const { usersRouter, transactionsRouter } = require('./routes/index.js');

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);



module.exports = { app };
