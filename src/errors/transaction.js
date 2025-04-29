export class TransactionNotFoundError extends Error {
    constructor(userId) {
        super(`Transaction with id ${userId} not found.`);
        this.name = 'TransactionNotFoundError';
    }
}
