import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createTestDonation,
  removeTestDonation,
  createDummyTestDonations,
  removeAllTestDonations,
  getTestDonation
} from '../utils/donation.util.js'
import {
  createTestCampaign,
  getTestCampaign,
  removeTestCampaign
} from '../utils/campaign.util.js'
import {
  createDummyTestCategories,
  removeAllTestCategories
} from '../utils/category.util.js'
import {
  createTestUser,
  getTestUser,
  removeTestUser
} from '../utils/auth.util.js'
import { strRandom } from '../../src/utils/helpers.js'

const uniqueEmail = strRandom(22) + '@example.com'
const uniqueCategoryName = strRandom(13)
const uniqueCampaignTitle = strRandom(15)

beforeAll(async () => {
  await removeTestCampaign(uniqueCampaignTitle)
  await removeAllTestCategories()
  await removeTestUser(uniqueEmail)

  await createTestUser(uniqueEmail)
  await createDummyTestCategories(uniqueCategoryName, 3)
  await createTestCampaign(uniqueEmail, uniqueCampaignTitle)
})

afterAll(async () => {
  await removeTestCampaign(uniqueCampaignTitle)
  await removeTestUser(uniqueEmail)
  await removeAllTestCategories()
})

describe('POST /api/donations - endpoint', () => {
  beforeEach(async () => {
    await removeTestDonation(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestDonation(uniqueEmail)
  })

  it('should be able to create a new donation', async () => {
    const user = await getTestUser(uniqueEmail)
    const campaign = await getTestCampaign(uniqueCampaignTitle)
    const result = await supertest(web)
      .post('/api/donations')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        campaign_id: campaign.id,
        anonim: 0,
        nominal: 500_000,
        support: '-'
      })

    expect(result.status).toBe(201)
    expect(result.body.data.campaigns).toBeDefined()
    expect(result.body.data.users).toBeDefined()
  })

  it('should fail to create a new donation with empty fields', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .post('/api/donations')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        anonim: 0,
        nominal: 500_000
      })

    expect(result.status).toBe(422)
    expect(result.body.errors).toBeDefined()
  })
})

describe('GET /api/donations/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestDonation(uniqueEmail)
    await createTestDonation(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestDonation(uniqueEmail)
  })

  it('should be able to get selected donation', async () => {
    const user = await getTestUser(uniqueEmail)
    const donation = await getTestDonation(uniqueEmail)
    const result = await supertest(web)
      .get('/api/donations/' + donation.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data?.users?.email).toBe(uniqueEmail)
  })

  it('should fail to get selected donation with an invalid ID', async () => {
    const user = await getTestUser(uniqueEmail)
    const donation = await getTestDonation(uniqueEmail)
    await removeTestDonation(uniqueEmail)

    const result = await supertest(web)
      .get('/api/donations/' + donation.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(404)
  })
})

describe('PUT /api/donations/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestDonation(uniqueEmail)
    await createTestDonation(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestDonation(uniqueEmail)
  })

  it('should be able to update selected donation', async () => {
    const user = await getTestUser(uniqueEmail)
    const campaign = await getTestCampaign(uniqueCampaignTitle)
    const donation = await getTestDonation(uniqueEmail)
    const result = await supertest(web)
      .patch('/api/donations/' + donation.id)
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        campaign_id: campaign.id,
        status: 'confirmed'
      })

    expect(result.status).toBe(200)
    expect(result.body.data.status).toBe('confirmed')
  })
})

describe('DELETE /api/donations/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestDonation(uniqueEmail)
    await createTestDonation(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestDonation(uniqueEmail)
  })

  it('should be able to delete selected donation', async () => {
    const user = await getTestUser(uniqueEmail)
    const donation = await getTestDonation(uniqueEmail)
    const result = await supertest(web)
      .delete('/api/donations/' + donation.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(204)
  })
})

describe('GET /api/donations - endpoint', () => {
  beforeEach(async () => {
    await removeAllTestDonations()
    await createDummyTestDonations(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeAllTestDonations()
  })

  it('should be able to get all or spesific donations with filter', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/donations')
      .set('Authorization', 'Bearer ' + user.access_token)
      .query({
        keyword: '',
        size: 10,
        page: 1,
        sort_by: 'title',
        sort_value: 'asc',
        status: ''
      })

    expect(result.status).toBe(200)
    expect(result.body.data.per_page).toBe(10)
    expect(result.body.data.total).toBe(30)
  })
})
