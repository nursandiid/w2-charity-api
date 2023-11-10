import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createDummyTestContacts,
  createTestContact,
  getTestContact,
  removeAllTestContacts,
  removeTestContact
} from '../utils/contact.util'
import {
  createTestUser,
  getTestUser,
  removeTestUser
} from '../utils/auth.util.js'
import { strRandom } from '../../src/utils/helpers.js'

const uniqueEmail = strRandom(15) + '@example.com'

describe('POST /api/contacts - endpoint', () => {
  beforeEach(async () => {
    await removeTestContact()
  })

  afterEach(async () => {
    await removeTestContact()
  })

  it('should be able to create a new contact', async () => {
    const result = await supertest(web).post('/api/contacts').send({
      name: 'Test',
      phone: '1234',
      email: 'test@gmail.com',
      subject: 'Test contact',
      message: 'Pesan test contact'
    })

    expect(result.status).toBe(201)
    expect(result.body.data).toBeDefined()
  })

  it('should fail to create a new contact with empty fields', async () => {
    const result = await supertest(web).post('/api/contacts').send({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    })

    expect(result.status).toBe(422)
  })
})

describe('DELETE /api/contacts/:id - endpoint', () => {
  beforeEach(async () => {
    await createTestContact()
    await createTestUser(uniqueEmail)
  })

  afterEach(async () => {
    removeTestContact()
    removeTestUser(uniqueEmail)
  })

  it('should be able to delete selected contact', async () => {
    const user = await getTestUser(uniqueEmail)
    const contact = await getTestContact()
    const result = await supertest(web)
      .delete('/api/contacts/' + contact.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(204)
  })
})

describe('GET /api/contacts - endpoint', () => {
  beforeEach(async () => {
    await removeAllTestContacts()
    await createTestUser(uniqueEmail)
    await createDummyTestContacts()
  })
  
  afterEach(async () => {
    await removeTestUser(uniqueEmail)
    await removeAllTestContacts()
  })

  it('should be able to get all or spesific contacts with filter', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/contacts')
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
