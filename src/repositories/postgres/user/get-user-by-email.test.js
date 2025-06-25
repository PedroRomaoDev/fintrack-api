import { prisma } from '../../../../prisma/prisma.js';
import { PostgresGetUserByEmailRepository } from './get-user-by-email.js';
import { user as fakeUser } from '../../../tests/index.js';

describe('GetUserByEmailRepository', () => {
    it('should get user by email on db', async () => {
        const user = await prisma.user.create({
            data: fakeUser,
        });
        const sut = new PostgresGetUserByEmailRepository();

        const result = await sut.execute(user.email);

        expect(result).toStrictEqual(user);
    });

    it('should call Prisma with correct params', async () => {
        const user = await prisma.user.create({
            data: fakeUser,
        });
        const sut = new PostgresGetUserByEmailRepository();

        const prismaSpy = jest.spyOn(prisma.user, 'findUnique');
        await sut.execute(user.email);

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                email: user.email,
            },
        });
    });

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetUserByEmailRepository();
        jest.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(
            new Error(),
        );

        const promise = sut.execute(fakeUser.email);

        await expect(promise).rejects.toThrow();
    });
});
