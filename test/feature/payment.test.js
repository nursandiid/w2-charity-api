import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createTestDonation,
  removeTestDonation,
  getTestDonation
} from '../utils/donation.util.js'
import {
  createTestCampaign,
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
import { createTestPayment, removeTestPayment } from '../utils/payment.util.js'

import { strRandom } from '../../src/utils/helpers.js'
import prisma from '../../src/applications/database.js'

const uniqueEmail = strRandom(23) + '@example.com'
const uniqueCategoryName = strRandom(11)
const uniqueCampaignTitle = strRandom(14)

beforeAll(async () => {
  await removeTestDonation(uniqueEmail)
  await removeTestCampaign(uniqueCampaignTitle)
  await removeAllTestCategories()
  await removeTestUser(uniqueEmail)

  await createTestUser(uniqueEmail, 'donor')
  await createDummyTestCategories(uniqueCategoryName, 3)
  await createTestCampaign(uniqueEmail, uniqueCampaignTitle)
  await createTestDonation(uniqueEmail, uniqueCampaignTitle)
})

afterAll(async () => {
  await removeTestDonation(uniqueEmail)
  await removeTestCampaign(uniqueCampaignTitle)
  await removeAllTestCategories()
  await removeTestUser(uniqueEmail)
})

describe('POST /api/donations/:donationId/payment - endpoint', () => {
  beforeEach(async () => {
    removeTestPayment(uniqueEmail)
  })

  afterEach(async () => {
    removeTestPayment(uniqueEmail)
  })

  it('should be able to create a new payment', async () => {
    const user = await getTestUser(uniqueEmail)
    const donation = await getTestDonation(uniqueEmail)
    const bank = await prisma.bank.findFirst({
      where: {
        code: '002' // BRI
      }
    })

    const result = await supertest(web)
      .post(`/api/donations/${donation.id}/payment`)
      .set('Authorization', 'Bearer ' + user.access_token)
      .field({
        name: 'Test',
        nominal: 10000,
        note: '-',
        bank_id: bank.id
      })
      .attach('path_image', process.cwd() + '/test/file-test/1.png')

    expect(result.status).toBe(201)
    expect(result.body.data).toBeDefined()
  })

  it('should fail to create a new payment if it already exists', async () => {
    await createTestPayment(uniqueEmail)
    const user = await getTestUser(uniqueEmail)
    const donation = await getTestDonation(uniqueEmail)
    const bank = await prisma.bank.findFirst({
      where: {
        code: '002' // BRI
      }
    })
    const result = await supertest(web)
      .post(`/api/donations/${donation.id}/payment`)
      .set('Authorization', 'Bearer ' + user.access_token)
      .field({
        name: 'Test',
        nominal: 10000,
        note: '-',
        bank_id: bank.id
      })
      .attach('path_image', process.cwd() + '/test/file-test/1.png')

    expect(result.status).toBe(400)
  })
})

describe('GET /api/donations/:donationId/payment - endpoint', () => {
  beforeEach(async () => {
    await removeTestPayment(uniqueEmail)
    await createTestPayment(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestPayment(uniqueEmail)
  })

  it('should be able to get selected payment', async () => {
    const user = await getTestUser(uniqueEmail)
    const donation = await getTestDonation(uniqueEmail)
    const result = await supertest(web)
      .get(`/api/donations/${donation.id}/payment`)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
  })

  it('should fail to get selected payment with an invalid donation ID', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get(`/api/donations/${1111111}/payment`)
      .set('Authorization', 'Bearer ' + user.access_token)

    expect(result.status).toBe(404)
  })
})

describe('PUT /api/donations/:donationId/payment - endpoint', () => {
  beforeEach(async () => {
    await removeTestPayment(uniqueEmail)
    await createTestPayment(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestPayment(uniqueEmail)
  })

  it('should be able to update selected payment', async () => {
    const user = await getTestUser(uniqueEmail)
    const donation = await getTestDonation(uniqueEmail)
    const bank = await prisma.bank.findFirst({
      where: {
        code: '002' // BRI
      }
    })
    const result = await supertest(web)
      .put(`/api/donations/${donation.id}/payment`)
      .set('Authorization', 'Bearer ' + user.access_token)
      .field({
        name: 'Test',
        nominal: 10000,
        note: '-',
        bank_id: bank.id
      })

    expect(result.status).toBe(200)
  })
})
