import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createDummyTestCategories,
  createTestCategory,
  getTestCategory,
  removeAllTestCategories,
  removeTestCategory
} from '../utils/category.util.js'
import {
  createTestUser,
  getTestUser,
  removeTestUser
} from '../utils/auth.util.js'
import { strRandom } from '../../src/utils/helpers.js'

const uniqueEmail = strRandom(15) + '@example.com'
const uniqueCategoryName = strRandom(10)

beforeAll(async () => {
  await createTestUser(uniqueEmail)
})

afterAll(async () => {
  await removeTestUser(uniqueEmail)
})

describe('POST /api/categories - endpoint', () => {
  beforeEach(async () => {
    await removeTestCategory(uniqueCategoryName)
  })

  afterEach(async () => {
    await removeTestCategory(uniqueCategoryName)
  })

  it('should be able to create new category', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .post('/api/categories')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        name: uniqueCategoryName
      })

    expect(result.status).toBe(201)
    expect(result.body.data.name).toBe(uniqueCategoryName)
  })

  it('should reject to create new category with empty fields', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .post('/api/categories')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        name: ''
      })

    expect(result.status).toBe(422)
  })
})

describe('GET /api/categories/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCategory(uniqueCategoryName)
    await createTestCategory(uniqueCategoryName)
  })

  afterEach(async () => {
    await removeTestCategory(uniqueCategoryName)
  })

  it('should be able to get selected category', async () => {
    const user = await getTestUser(uniqueEmail)
    const category = await getTestCategory(uniqueCategoryName)
    const result = await supertest(web)
      .get('/api/categories/' + category.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data.name).toBe(uniqueCategoryName)
  })

  it('should failed to get selected category with invalid ID', async () => {
    const user = await getTestUser(uniqueEmail)
    const category = await getTestCategory(uniqueCategoryName)
    await removeTestCategory(uniqueCategoryName)

    const result = await supertest(web)
      .get('/api/categories/' + category.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(404)
  })
})

describe('PUT /api/categories/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCategory(uniqueCategoryName)
    await createTestCategory(uniqueCategoryName)
  })

  afterEach(async () => {
    await removeTestCategory(uniqueCategoryName)
  })

  it('should be able to update selected category', async () => {
    const user = await getTestUser(uniqueEmail)
    const category = await getTestCategory(uniqueCategoryName)
    const result = await supertest(web)
      .put('/api/categories/' + category.id)
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        name: 'Category 1 updated'
      })

    expect(result.status).toBe(200)
    expect(result.body.data.name).toBe('Category 1 updated')
  })
})

describe('DELETE /api/categories/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCategory(uniqueCategoryName)
    await createTestCategory(uniqueCategoryName)
  })

  afterEach(async () => {
    await removeTestCategory(uniqueCategoryName)
  })

  it('should be able to delete selected category', async () => {
    const user = await getTestUser(uniqueEmail)
    const category = await getTestCategory(uniqueCategoryName)
    const result = await supertest(web)
      .delete('/api/categories/' + category.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(204)
  })
})

describe('GET /api/categories - endpoint', () => {
  beforeEach(async () => {
    await removeAllTestCategories()
    await createDummyTestCategories(uniqueCategoryName)
  })

  afterEach(async () => {
    await removeAllTestCategories()
  })

  it('should be able to get all or spesific categories with filter', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/categories')
      .set('Authorization', 'Bearer ' + user.access_token)
      .query({
        keyword: '',
        size: 10,
        page: 1,
        sort_by: 'name',
        sort_value: 'asc'
      })

    expect(result.status).toBe(200)
    expect(result.body.data.per_page).toBe(10)
    expect(result.body.data.total).toBe(30)
  })
})
