export class TransactionNotFoundError extends Error {
    constructor(transactionId) {
        super(`Transaction with id ${transactionId} not found.`);
        this.name = 'TransactionNotFoundError';
    }
}
