import slug from 'slug'
import prisma from '../../src/applications/database.js'

const createTestCategory = async () => {
  await prisma.categories.create({
    data: {
      name: 'Category 1',
      slug: slug('Category 1'),
    },
  })
}

const removeTestCategory = async () => {
  await prisma.categories.deleteMany({
    where: {
      name: 'Category 1',
    },
  })
}

const createDummyTestCategories = async () => {
  let categories = []
  for (let i = 1; i <= 30; i++) {
    categories.push({
      name: `Category ${i}`,
      slug: slug(`Category ${i}`),
    })
  }

  await prisma.categories.createMany({
    data: categories,
  })
}

const removeAllTestCategories = async () => {
  await prisma.categories.deleteMany({})
}

const getTestCategory = async () => {
  return await prisma.categories.findFirst({
    where: {
      name: 'Category 1',
    },
  })
}

export {
  createTestCategory,
  removeTestCategory,
  createDummyTestCategories,
  removeAllTestCategories,
  getTestCategory,
}
