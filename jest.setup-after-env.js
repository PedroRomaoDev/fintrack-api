import { prisma } from './prisma/prisma';

beforeEach(async () => {
    await prisma.transaction.deleteMany(); // <-- deletar dependentes primeiro
    await prisma.user.deleteMany();
});
