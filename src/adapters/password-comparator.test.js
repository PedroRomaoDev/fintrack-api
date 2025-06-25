import bcrypt from 'bcrypt';
import { PasswordComparatorAdapter } from './password-comparator.js';

jest.mock('bcrypt');

describe('PasswordComparatorAdapter', () => {
    const password = 'plain-password';
    const hashedPassword = '$2b$10$hashhashhash';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if passwords match', async () => {
        bcrypt.compare.mockResolvedValue(true);

        const sut = new PasswordComparatorAdapter();
        const result = await sut.execute(password, hashedPassword);

        expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
        expect(result).toBe(true);
    });

    it('should return false if passwords do not match', async () => {
        bcrypt.compare.mockResolvedValue(false);

        const sut = new PasswordComparatorAdapter();
        const result = await sut.execute(password, hashedPassword);

        expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
        expect(result).toBe(false);
    });

    it('should throw if bcrypt.compare throws', async () => {
        bcrypt.compare.mockRejectedValue(new Error('compare error'));

        const sut = new PasswordComparatorAdapter();

        await expect(sut.execute(password, hashedPassword)).rejects.toThrow(
            'compare error',
        );
    });
});
