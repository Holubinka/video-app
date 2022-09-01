import { PrismaClient } from '@prisma/client';
import dataUtils from '../utils/dataUtils';

(async () => {
  const prisma = new PrismaClient();
  await prisma.user.create({
    data: {
      firstName: 'super',
      lastName: 'admin',
      password: dataUtils.hashString('super-strong-password'),
      email: dataUtils.encryptString('super.admin@gmail.com'),
      emailHash: dataUtils.hashString('super.admin@gmail.com'),
      active: true,
    },
  });
})();
