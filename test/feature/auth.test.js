import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createTestUser,
  removeTestUser,
  getTestUser
} from '../utils/auth.util.js'
import { strRandom } from '../../src/utils/helpers.js'

const uniqueEmail = strRandom(15) + '@example.com'

describe('POST /api/auth/register - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  it('should be able to register a user', async () => {
    const result = await supertest(web).post('/api/auth/register').send({
      name: 'Nursandi',
      email: uniqueEmail,
      password: '123456',
      password_confirmation: '123456'
    })

    expect(result.status).toBe(201)
    expect(result.body.data).toBeDefined()
  })

  it('should fail to register a user with empty fields', async () => {
    const result = await supertest(web).post('/api/auth/register').send({
      name: 'Nursandi'
    })

    expect(result.status).toBe(422)
    expect(result.body.errors).toBeDefined()
  })

  it('should fail to register a user with if the password does not match', async () => {
    const result = await supertest(web).post('/api/auth/register').send({
      name: 'Nursandi',
      email: uniqueEmail,
      password: '123456',
      password_confirmation: 'SALAHH'
    })

    expect(result.status).toBe(422)
    expect(result.body.errors).toBeDefined()
  })
})

describe('POST /api/auth/login - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueEmail)
    await createTestUser(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  it('should be able to login with valid identities', async () => {
    const result = await supertest(web).post('/api/auth/login').send({
      email: uniqueEmail,
      password: '123456'
    })

    expect(result.status).toBe(200)
    expect(result.body.data.access_token).toBeDefined()
  })

  it('should fail to login if the identities is wrong', async () => {
    const result = await supertest(web).post('/api/auth/login').send({
      email: uniqueEmail,
      password: 'SALAH'
    })

    expect(result.status).toBe(401)
    expect(result.body.message).toBe('Email or password is wrong')
  })
})

describe('GET /api/auth/current - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueEmail)
    await createTestUser(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  it('should be able to get current profile', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/auth/current')
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
  })

  it('should fail to get current profile if token is expired', async () => {
    const user = await getTestUser(uniqueEmail, '1s')
    await new Promise((resolve, reject) => {
      console.info('hold request in 3s')
      setTimeout(() => {
        resolve('success')
      }, 3000)
    })

    const result = await supertest(web)
      .get('/api/auth/current')
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(401)
    expect(result.body.message).toBe('Token is expired')
  })

  it('should fail to get current profile with invalid token', async () => {
    const result = await supertest(web)
      .get('/api/auth/current')
      .set('Authorization', 'Bearer not-valid')

    expect(result.status).toBe(401)
    expect(result.body.message).toBe('Invalid token format')
  })
})

describe('PUT /api/auth/current - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueEmail)
    await createTestUser(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  it('should be able to update current profile', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .put('/api/auth/current')
      .set('Authorization', 'Bearer ' + user.access_token)
      .field({
        name: 'Nursandi updated',
        email: uniqueEmail,
        gender: 'laki_laki',
        phone: '-',
        birth_date: '2020-01-01',
        job: '-',
        address: '-',
        about: '-'
      })
      .attach('path_image', process.cwd() + '/test/file-test/1.png')

    expect(result.status).toBe(200)
    expect(result.body.data.name).toBe('Nursandi updated')
    expect(result.body.message).toBe('Updated')
  })
})

describe('PATCH /api/auth/password - endpoint', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueEmail)
    await createTestUser(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  it('should be able to update password with valid current password and match password confirmation', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .patch('/api/auth/password')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        current_password: '123456',
        password: 'admin123',
        password_confirmation: 'admin123'
      })

    expect(result.status).toBe(200)
    expect(result.body.message).toBe('Updated')
  })

  it('should fail to update password with invalid current password', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .patch('/api/auth/password')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        current_password: 'SALAH',
        password: 'admin123',
        password_confirmation: 'admin123'
      })

    expect(result.status).toBe(400)
  })
})
