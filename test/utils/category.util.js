import { strSlug } from '../../src/utils/helpers.js'
import prisma from '../../src/applications/database.js'

const createTestCategory = async (name = 'Category 1') => {
  await prisma.categories.create({
    data: {
      name,
      slug: strSlug(name)
    }
  })
}

const removeTestCategory = async (name = 'Category 1') => {
  await prisma.$transaction(async (prisma) => {
    await prisma.category_campaign.deleteMany({
      where: {
        categories: {
          name
        }
      }
    })

    await prisma.categories.deleteMany({
      where: {
        name
      }
    })
  })
}

const createDummyTestCategories = async (name = 'Category', length = 30) => {
  let categories = []
  for (let i = 1; i <= length; i++) {
    categories.push({
      name: `${name} ${i}`,
      slug: strSlug(`${name} ${i}`)
    })
  }

  await prisma.categories.createMany({
    data: categories
  })
}

const removeAllTestCategories = async () => {
  await prisma.$transaction([
    prisma.category_campaign.deleteMany(),
    prisma.categories.deleteMany()
  ])
}

const getTestCategory = async (name = 'Category 1') => {
  return await prisma.categories.findFirst({
    where: {
      name
    }
  })
}

const getAllTestCategories = async () => {
  return await prisma.categories.findMany()
}

export {
  createTestCategory,
  removeTestCategory,
  createDummyTestCategories,
  removeAllTestCategories,
  getTestCategory,
  getAllTestCategories
}
