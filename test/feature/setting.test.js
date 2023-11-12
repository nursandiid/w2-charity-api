import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createTestSetting,
  getTestSetting,
  removeTestSetting
} from '../utils/setting.util.js'
import {
  createTestUser,
  getTestUser,
  removeTestUser
} from '../utils/auth.util.js'
import { deleteSelectedProperties, strRandom } from '../../src/utils/helpers.js'

const uniqueEmail = strRandom(12) + '@example.com'

beforeAll(async () => {
  await createTestUser(uniqueEmail)
})

afterAll(async () => {
  await removeTestUser(uniqueEmail)
})

describe('GET /api/settings/current - endpoint', () => {
  beforeEach(async () => {
    await removeTestSetting()
    await createTestSetting()
  })

  afterEach(async () => {
    await removeTestSetting()
  })

  it('should be able to get current setting', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/settings/current')
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
  })
})

describe('PUT /api/settings/current - endpoint', () => {
  beforeEach(async () => {
    await removeTestSetting()
    await createTestSetting()
  })

  afterEach(async () => {
    await removeTestSetting()
  })

  it('should be able to update current setting', async () => {
    const user = await getTestUser(uniqueEmail)
    const setting = await getTestSetting()

    deleteSelectedProperties(setting, ['id', 'created_at', 'updated_at'])

    const result = await supertest(web)
      .put('/api/settings/current')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        ...setting,
        owner_name: 'Administrator updated'
      })

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
    expect(result.body.data.owner_name).toBe('Administrator updated')
  })
})
