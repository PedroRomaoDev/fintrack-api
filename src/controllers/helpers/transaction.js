import { notFound } from './index.js';

export const transactionNotFoundResponse = () => {
    return notFound({ message: 'Transaction not found.' });
};
