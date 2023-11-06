import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createDummyTestCategories,
  createTestCategory,
  getTestCategory,
  removeAllTestCategories,
  removeTestCategory,
} from '../utils/category.util.js'

describe('GET /api/categories', () => {
  beforeEach(async () => {
    await removeAllTestCategories()
    await createDummyTestCategories()
  })

  afterEach(async () => {
    await removeAllTestCategories()
  })

  it('should be able to get all or spesific categories with filter', async () => {
    const result = await supertest(web).get('/api/categories').query({
      keyword: '',
      size: 10,
      page: 1,
      sort_by: 'name',
      sort_value: 'asc',
    })

    expect(result.status).toBe(200)
    expect(result.body.data.per_page).toBe(10)
    expect(result.body.data.total).toBe(30)
  })
})

describe('POST /api/categories', () => {
  beforeEach(async () => {
    await removeTestCategory()
  })

  afterEach(async () => {
    await removeTestCategory()
  })

  it('should be able to create new category', async () => {
    const result = await supertest(web).post('/api/categories').send({
      name: 'Category 1',
    })

    expect(result.status).toBe(201)
    expect(result.body.data.name).toBe('Category 1')
  })

  it('should reject to create new category with empty fields', async () => {
    const result = await supertest(web).post('/api/categories').send({
      name: '',
    })

    expect(result.status).toBe(422)
  })
})

describe('GET /api/categories/:id', () => {
  beforeEach(async () => {
    await removeTestCategory()
    await createTestCategory()
  })

  afterEach(async () => {
    await removeTestCategory()
  })

  it('should be able to get selected category', async () => {
    const category = await getTestCategory()
    const result = await supertest(web).get('/api/categories/' + category.id)

    expect(result.status).toBe(200)
    expect(result.body.data.name).toBe('Category 1')
  })

  it('should failed to get selected category with invalid ID', async () => {
    const category = await getTestCategory()
    await removeTestCategory()

    const result = await supertest(web).get('/api/categories/' + category.id)

    expect(result.status).toBe(404)
  })
})

describe('PUT /api/categories/:id', () => {
  beforeEach(async () => {
    await removeTestCategory()
    await createTestCategory()
  })

  afterEach(async () => {
    await removeAllTestCategories()
  })

  it('should be able to update selected category', async () => {
    const category = await getTestCategory()
    const result = await supertest(web)
      .put('/api/categories/' + category.id)
      .send({
        name: 'Category 1 updated',
      })

    expect(result.status).toBe(200)
    expect(result.body.data.name).toBe('Category 1 updated')
  })
})

describe('DELETE /api/categories/:id', () => {
  beforeEach(async () => {
    await removeTestCategory()
    await createTestCategory()
  })

  afterEach(async () => {
    await removeAllTestCategories()
  })

  it('should be able to update selected category', async () => {
    const category = await getTestCategory()
    const result = await supertest(web).delete('/api/categories/' + category.id)

    expect(result.status).toBe(204)
  })
})
