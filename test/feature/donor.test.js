import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createTestUser,
  createDummyTestUsers,
  getTestUser,
  removeTestUser,
  removeAllTestUsers
} from '../utils/auth.util.js'
import { strRandom } from '../../src/utils/helpers.js'

const uniqueEmail = strRandom(14) + '@example.com'
const uniqueDonorEmail = strRandom(15) + '@example.com'

beforeAll(async () => {
  await createTestUser(uniqueEmail)
})

afterAll(async () => {
  await removeTestUser(uniqueEmail)
})

describe('POST /api/donors - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueDonorEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueDonorEmail)
  })

  it('should be able to create new donor', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .post('/api/donors')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        name: 'Nursandi',
        email: uniqueDonorEmail,
        password: '123456',
        password_confirmation: '123456'
      })

    expect(result.status).toBe(201)
    expect(result.body.data.name).toBe('Nursandi')
  })

  it('should reject to create new donor with empty fields', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .post('/api/donors')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      })

    expect(result.status).toBe(422)
  })
})

describe('GET /api/donors/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueDonorEmail)
    await createTestUser(uniqueDonorEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueDonorEmail)
  })

  it('should be able to get selected donor', async () => {
    const user = await getTestUser(uniqueEmail)
    const donor = await getTestUser(uniqueDonorEmail)
    const result = await supertest(web)
      .get('/api/donors/' + donor.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data.name).toBe('Nursandi')
  })

  it('should failed to get selected donor with invalid ID', async () => {
    const user = await getTestUser(uniqueEmail)
    const donor = await getTestUser(uniqueDonorEmail)
    await removeTestUser(uniqueDonorEmail)

    const result = await supertest(web)
      .get('/api/donors/' + donor.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(404)
  })
})

describe('PUT /api/donors/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueDonorEmail)
    await createTestUser(uniqueDonorEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueDonorEmail)
  })

  it('should be able to update selected donor', async () => {
    const user = await getTestUser(uniqueEmail)
    const donor = await getTestUser(uniqueDonorEmail)
    const result = await supertest(web)
      .put('/api/donors/' + donor.id)
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        name: 'Nursandi updated',
        email: uniqueDonorEmail
      })

    expect(result.status).toBe(200)
    expect(result.body.data.name).toBe('Nursandi updated')
  })
})

describe('DELETE /api/donors/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueDonorEmail)
    await createTestUser(uniqueDonorEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueDonorEmail)
  })

  it('should be able to delete selected donor', async () => {
    const user = await getTestUser(uniqueEmail)
    const donor = await getTestUser(uniqueDonorEmail)
    const result = await supertest(web)
      .delete('/api/donors/' + donor.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(204)
  })
})

describe('GET /api/donors - endpoint', () => {
  beforeEach(async () => {
    await removeAllTestUsers()
    await createDummyTestUsers(uniqueDonorEmail)

    await removeTestUser(uniqueDonorEmail)
    await createTestUser(uniqueEmail)
  })

  afterEach(async () => {
    await removeAllTestUsers()
  })

  it('should be able to get all or spesific donors with filter', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/donors')
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
    expect(result.body.data.total).toBe(31) // +1 by unique email
  })
})
