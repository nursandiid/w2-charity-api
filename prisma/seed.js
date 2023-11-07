import prisma from '../src/applications/database.js'
import bcrypt from 'bcrypt'

const rolesSeeder = async () => {
  await prisma.roles.createMany({
    data: [{ name: 'admin' }, { name: 'donor' }],
  })

  console.info('🌱 Roles seeding completed successfully')
}

const usersSeeder = async () => {
  const roleAdmin = await prisma.roles.findFirst({
    where: {
      name: 'admin',
    },
  })

  if (!roleAdmin) {
    await rolesSeeder()
    return usersSeeder()
  }

  await prisma.users.upsert({
    where: {
      email: 'nursandi@example.com',
    },
    create: {
      name: 'Nursandi',
      email: 'nursandi@example.com',
      password: await bcrypt.hash('123456', 10),
      roles: {
        connect: {
          id: roleAdmin.id,
        },
      },
    },
    update: {},
  })

  console.info('🌱 Users seeding completed successfully')
}

const settingSeeder = async () => {
  await prisma.settings.upsert({
    where: {
      email: 'support@w2charity.com',
    },
    create: {
      email: 'support@w2charity.com',
      phone: '123123123',
      phone_hours: "Senin - Jum'at, 08:00 s/d 16:00",
      owner_name: 'Administrator',
      company_name: 'W2 Charity',
      short_description: '-',
      keyword: '-',
      about: '-',
      address: '-',
      postal_code: '12345',
      city: '-',
      province: '-',
      instagram_link: '-',
      twitter_link: '-',
      fanpage_link: '-',
      google_plus_link: '-',
    },
    update: {},
  })

  console.info('🌱 Setting seeding completed successfully')
}

const run = async () => {
  try {
    await usersSeeder()
    await settingSeeder()
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

run()
