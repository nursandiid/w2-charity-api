import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createDummyTestCampaigns,
  createTestCampaign,
  getTestCampaign,
  removeAllTestCampaigns,
  removeTestCampaign
} from '../utils/campaign.util.js'
import {
  createDummyTestCategories,
  getAllTestCategories,
  removeAllTestCategories
} from '../utils/category.util.js'
import {
  createTestUser,
  getTestUser,
  removeTestUser
} from '../utils/auth.util.js'
import { strRandom } from '../../src/utils/helpers.js'

const uniqueEmail = strRandom(15) + '@example.com'
const uniqueCategoryName = strRandom(10)
const uniqueCampaignTitle = strRandom(10)

beforeAll(async () => {
  await createTestUser(uniqueEmail)
  await removeAllTestCategories()
  await createDummyTestCategories(uniqueCategoryName, 3)
})

afterAll(async () => {
  await removeTestUser(uniqueEmail)
  await removeAllTestCategories()
})

describe('POST /api/campaigns - endpoint', () => {
  beforeEach(async () => {
    await removeTestCampaign(uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestCampaign(uniqueCampaignTitle)
  })

  it('should be able to create new campaign', async () => {
    const user = await getTestUser(uniqueEmail)
    const categories = await getAllTestCategories()
    const result = await supertest(web)
      .post('/api/campaigns')
      .set('Authorization', 'Bearer ' + user.access_token)
      .field({
        title: uniqueCampaignTitle,
        short_description: '-',
        body: '-',
        status: 'publish',
        goal: 1000000,
        end_date: '2023-12-01',
        note: '-',
        receiver: 'Lainnya',
        publish_date: '2023-11-10',
        category_ids: categories.map((category) => category.id)
      })
      .attach('path_image', process.cwd() + '/test/file-test/1.png')

    expect(result.status).toBe(201)
    expect(result.body.data.title).toBe(uniqueCampaignTitle)
  })

  it('should reject to create new campaign with empty fields', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .post('/api/campaigns')
      .set('Authorization', 'Bearer ' + user.access_token)
      .field({
        title: uniqueCampaignTitle,
        short_description: '-',
        body: '-',
        status: 'publish',
        goal: 1000000,
        end_date: '2023-12-01',
        note: '-',
        receiver: 'Lainnya',
        publish_date: '2023-11-10'
      })

    expect(result.status).toBe(422)
    expect(result.body.errors).toBeDefined()
  })
})

describe('GET /api/campaigns/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCampaign(uniqueCampaignTitle)
    await createTestCampaign(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestCampaign(uniqueCampaignTitle)
  })

  it('should be able to get selected campaign', async () => {
    const user = await getTestUser(uniqueEmail)
    const campaign = await getTestCampaign(uniqueCampaignTitle)
    const result = await supertest(web)
      .get('/api/campaigns/' + campaign.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data.title).toBe(uniqueCampaignTitle)
  })

  it('should failed to get selected campaign with invalid ID', async () => {
    const user = await getTestUser(uniqueEmail)
    const campaign = await getTestCampaign(uniqueCampaignTitle)
    await removeTestCampaign(uniqueCampaignTitle)

    const result = await supertest(web)
      .get('/api/campaigns/' + campaign.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(404)
  })
})

describe('PUT /api/campaigns/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCampaign(uniqueCampaignTitle)
    await createTestCampaign(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestCampaign(uniqueCampaignTitle)
  })

  it('should be able to update selected campaign', async () => {
    const user = await getTestUser(uniqueEmail)
    const campaign = await getTestCampaign(uniqueCampaignTitle)
    const result = await supertest(web)
      .put('/api/campaigns/' + campaign.id)
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        title: 'Campaign title 1 updated'
      })

    expect(result.status).toBe(200)
    expect(result.body.data.title).toBe('Campaign title 1 updated')
  })
})

describe('DELETE /api/campaigns/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCampaign(uniqueCampaignTitle)
    await createTestCampaign(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestCampaign(uniqueCampaignTitle)
  })

  it('should be able to delete selected campaign', async () => {
    const user = await getTestUser(uniqueEmail)
    const campaign = await getTestCampaign(uniqueCampaignTitle)
    const result = await supertest(web)
      .delete('/api/campaigns/' + campaign.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(204)
  })
})

describe('GET /api/campaigns - endpoint', () => {
  beforeEach(async () => {
    await removeAllTestCampaigns()
    await createDummyTestCampaigns(uniqueEmail)
  })

  afterEach(async () => {
    await removeAllTestCampaigns()
  })

  it('should be able to get all or spesific campaigns with filter', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/campaigns')
      .set('Authorization', 'Bearer ' + user.access_token)
      .query({
        keyword: '',
        size: 10,
        page: 1,
        sort_by: 'title',
        sort_value: 'asc',
        status: '',
        start_date: '',
        end_date: ''
      })

    expect(result.status).toBe(200)
    expect(result.body.data.per_page).toBe(10)
    expect(result.body.data.total).toBe(30)
  })
})
