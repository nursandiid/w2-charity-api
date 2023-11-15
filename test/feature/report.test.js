import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createTestUser,
  getTestUser,
  removeTestUser
} from '../utils/auth.util.js'
import { strRandom } from '../../src/utils/helpers.js'
import moment from 'moment'

const uniqueEmail = strRandom(12) + '@example.com'

beforeAll(async () => {
  await createTestUser(uniqueEmail)
})

afterAll(async () => {
  await removeTestUser(uniqueEmail)
})

describe('GET /api/reports - endpoint', () => {
  it('should be able to get all reports per month', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/reports')
      .set('Authorization', 'Bearer ' + user.access_token)
      .query({
        start_date: '',
        end_date: ''
      })

    expect(result.status).toBe(200)
    expect(result.body.data.pop().date).toBe(moment().format('YYYY-MM-DD'))
  })

  it('should be able to get all reports by filters date', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/reports')
      .set('Authorization', 'Bearer ' + user.access_token)
      .query({
        start_date: '2023-10-01',
        end_date: '2023-10-31'
      })

    expect(result.status).toBe(200)
    expect(result.body.data[0].date).toBe('2023-10-01')
    expect(result.body.data.pop().date).toBe('2023-10-31')
  })
})

describe('GET /api/reports/pdf - endpoint', () => {
  it('should be able to export report as pdf file', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/reports/pdf')
      .set('Authorization', 'Bearer ' + user.access_token)
      .query({
        start_date: '',
        end_date: ''
      })

    expect(result.status).toBe(200)
    expect(result.headers['content-type']).toBe('application/pdf')
    expect(result.headers['content-disposition']).toContain('attachment')
  })
})

describe('GET /api/reports/excel - endpoint', () => {
  it('should be able to export report as excel file', async () => {
    const user = await getTestUser(uniqueEmail)
    const result = await supertest(web)
      .get('/api/reports/excel')
      .set('Authorization', 'Bearer ' + user.access_token)
      .query({
        start_date: '',
        end_date: ''
      })

    expect(result.status).toBe(200)
    expect(result.headers['content-type']).toContain(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    expect(result.headers['content-disposition']).toContain('attachment')
  })
})
