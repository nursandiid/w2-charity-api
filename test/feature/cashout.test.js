import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createTestDonation,
  removeTestDonation,
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
import {
  createTestCashout,
  removeTestCashout,
  getTestCashout
} from '../utils/cashout.util.js'
import prisma from '../../src/applications/database.js'

const uniqueEmail = strRandom(24) + '@example.com'
const uniqueCategoryName = strRandom(18)
const uniqueCampaignTitle = strRandom(27)

beforeAll(async () => {
  await removeTestDonation(uniqueEmail)
  await removeTestCampaign(uniqueCampaignTitle)
  await removeAllTestCategories()
  await removeTestUser(uniqueEmail)

  await createTestUser(uniqueEmail)
  await createDummyTestCategories(uniqueCategoryName, 3)
  await createTestCampaign(uniqueEmail, uniqueCampaignTitle)
  await createTestDonation(uniqueEmail, uniqueCampaignTitle)
})

afterAll(async () => {
  await removeTestDonation(uniqueEmail)
  await removeTestCampaign(uniqueCampaignTitle)
  await removeTestUser(uniqueEmail)
  await removeAllTestCategories()
})

describe('POST /api/cashouts - endpoint', () => {
  beforeEach(async () => {
    await removeTestCashout(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestCashout(uniqueEmail)
  })

  it('should be able to create a new cashout', async () => {
    const user = await getTestUser(uniqueEmail)
    const campaign = await getTestCampaign(uniqueCampaignTitle)
    const bank = await prisma.bank.findFirst({
      where: {
        code: '002' // BRI
      }
    })

    const donation = await getTestDonation(uniqueEmail)
    await prisma.donations.update({
      where: {
        id: donation.id
      },
      data: {
        status: 'confirmed',
        campaigns: {
          update: {
            data: {
              nominal: campaign.nominal + donation.nominal
            }
          }
        }
      }
    })

    const result = await supertest(web)
      .post('/api/cashouts')
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        cashout_amount: 100_000,
        campaign_id: campaign.id,
        bank_id: bank.id
      })

    expect(result.status).toBe(201)
    expect(result.body.data.amount_received).toBe(95_000) // minus by cost
  })
})

describe('GET /api/cashouts/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCashout(uniqueEmail)
    await createTestCashout(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestCashout(uniqueEmail)
  })

  it('should be able to get selected cashout', async () => {
    const user = await getTestUser(uniqueEmail)
    const cashout = await getTestCashout(uniqueEmail, uniqueCampaignTitle)
    const result = await supertest(web)
      .get('/api/cashouts/' + cashout.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
  })

  it('should fail to get selected cashout with an invalid ID', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/cashouts/' + 9999999)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
  })
})

describe('PUT /api/cashouts/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCashout(uniqueEmail)
    await createTestCashout(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestCashout(uniqueEmail)
  })

  it('should be able to update selected cashout', async () => {
    await prisma.campaigns.update({
      where: {
        slug: uniqueCampaignTitle
      },
      data: {
        nominal: 0
      }
    })

    const user = await getTestUser(uniqueEmail)
    const campaign = await getTestCampaign(uniqueCampaignTitle)

    let donation = await getTestDonation(uniqueEmail)
    donation = await prisma.donations.update({
      where: {
        id: donation.id
      },
      data: {
        status: 'confirmed',
        campaigns: {
          update: {
            data: {
              nominal: campaign.nominal + donation.nominal
            }
          }
        }
      },
      include: {
        campaigns: true
      }
    })

    const cashout = await getTestCashout(uniqueEmail, uniqueCampaignTitle)
    const result = await supertest(web)
      .patch('/api/cashouts/' + cashout.id)
      .set('Authorization', 'Bearer ' + user.access_token)
      .send({
        campaign_id: campaign.id,
        status: 'success'
      })

    expect(result.status).toBe(200)
    expect(result.body.data.campaigns.nominal).toBe(900_000)
  })
})

describe('DELETE /api/cashouts/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestCashout(uniqueEmail)
    await createTestCashout(uniqueEmail, uniqueCampaignTitle)
  })

  afterEach(async () => {
    await removeTestCashout(uniqueEmail)
  })

  it('should be able to delete selected cashout', async () => {
    const user = await getTestUser(uniqueEmail)
    const cashout = await getTestCashout(uniqueEmail, uniqueCampaignTitle)
    const result = await supertest(web)
      .delete('/api/cashouts/' + cashout.id)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(204)
  })
})
