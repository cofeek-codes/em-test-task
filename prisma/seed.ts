import { PrismaClient } from '../src/generated/prisma/client'
import bcrypt from 'bcryptjs'

const userEmail = 'exampleuser@mail.ru'
const adminEmail = 'exampleadmin@mail.ru'

const prisma = new PrismaClient()
async function main() {
  console.log('Seeding...........')

  const existingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  })
  if (!existingUser) {
    console.log('Seeding new user...')

    const user = await prisma.user.create({
      data: {
        fullName: 'example user fullname',
        email: userEmail,
        password: bcrypt.hashSync('user123', 10),
      },
    })
  } else {
    console.log('User is already seeded')
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })
  if (!existingAdmin) {
    console.log('Seeding new admin...')

    const admin = await prisma.user.create({
      data: {
        fullName: 'example admin fullname',
        email: adminEmail,
        password: bcrypt.hashSync('admin123', 10),
        role: 'ADMIN',
      },
    })
  } else {
    console.log('Admin is already seeded')
  }

  console.log('Seeding...........Done')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
