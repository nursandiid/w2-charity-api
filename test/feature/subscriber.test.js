import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createDummyTestSubscribers,
  createTestSubscriber,
  getTestSubscriber,
  removeAllTestSubscribers,
  removeTestSubscriber
} from '../utils/subscriber.util.js'
import {
  createTestUser,
  getTestUser,
  removeTestUser
} from '../utils/auth.util.js'
import { strRandom } from '../../src/utils/helpers.js'

const uniqueEmail = strRandom(13) + '@example.com'

describe('POST /api/subscribers - endpoint', () => {
  beforeEach(async () => {
    await removeTestSubscriber()
  })

  afterEach(async () => {
    await removeTestSubscriber()
  })

  it('should be able to create a new subscriber', async () => {
    const result = await supertest(web).post('/api/subscribers').send({
      email: 'test@gmail.com'
    })

    expect(result.status).toBe(201)
    expect(result.body.data).toBeDefined()
  })

  it('should fail to create a new subscriber with empty fields', async () => {
    const result = await supertest(web).post('/api/subscribers').send({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    })

    expect(result.status).toBe(422)
  })
})

describe('DELETE /api/subscribers/:id - endpoint', () => {
  beforeEach(async () => {
    await createTestSubscriber()
    await createTestUser(uniqueEmail)
  })

  afterEach(async () => {
    removeTestSubscriber()
    removeTestUser(uniqueEmail)
  })

  it('should be able to delete selected subscriber', async () => {
    const user = await getTestUser(uniqueEmail)
    const subscriber = await getTestSubscriber()
    const result = await supertest(web)
      .delete('/api/subscribers/' + subscriber.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(204)
  })
})

describe('GET /api/subscribers - endpoint', () => {
  beforeEach(async () => {
    await removeAllTestSubscribers()
    await createTestUser(uniqueEmail)
    await createDummyTestSubscribers()
  })

  afterEach(async () => {
    await removeTestUser(uniqueEmail)
    await removeAllTestSubscribers()
  })

  it('should be able to get all or spesific subscribers with filter', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/subscribers')
      .set('Authorization', 'Bearer ' + user.access_token)
      .query({
        keyword: '',
        size: 10,
        page: 1,
        sort_by: 'created_at',
        sort_value: 'desc'
      })

    expect(result.status).toBe(200)
    expect(result.body.data.per_page).toBe(10)
    expect(result.body.data.total).toBe(30)
  })
})
