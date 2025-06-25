import { GetUserByIdController, CreateUserController } from '../../controllers';
import { makeGetUserByIdController, makeCreateUserController } from './user';

describe('User Controller Factories', () => {
    it('should return a valid GetUserByIdController instance', () => {
        expect(makeGetUserByIdController()).toBeInstanceOf(
            GetUserByIdController,
        );
    });
    it('should return a valid CreateUserController instance', () => {
        expect(makeCreateUserController()).toBeInstanceOf(CreateUserController);
    });
});
