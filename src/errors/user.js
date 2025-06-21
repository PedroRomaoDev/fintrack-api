export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The e-mail ${email} is already in use.`);
        this.name = 'EmailAlreadyInUseError';
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with id ${userId} not found.`);
        this.name = 'UserNotFoundError';
    }
}
export class InvalidPasswordError extends Error {
    constructor(userId) {
        super(`Invalid password for user with id ${userId}.`);
        this.name = 'InvalidPasswordError';
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('Forbidden');
        this.name = 'ForbiddenError';
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized.');
        this.name = 'UnauthorizedError';
    }
}
