import prisma from '../../src/applications/database'

const createTestSetting = async () => {
  await prisma.settings.create({
    data: {
      owner_name: 'Administrator',
      email: 'support@w2charity.com',
      phone: '081232323221',
      about: '-',
      address: '-',
      postal_code: '12345',
      city: '-',
      province: '-',
      company_name: 'W2 Charity',
      short_description: '-',
      keyword: '-',
      phone_hours: "Senin - Jum'at 08:00 s/d 16:00",
      instagram_link: '-',
      twitter_link: '-',
      fanpage_link: '-',
      google_plus_link: '-'
    }
  })
}

const getTestSetting = async () => {
  return await prisma.settings.findFirst()
}

const removeTestSetting = async() => {
  await prisma.settings.deleteMany({})
}

export { createTestSetting, getTestSetting, removeTestSetting }
