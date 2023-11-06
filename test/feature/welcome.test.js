import supertest from 'supertest'
import web from '../../src/applications/web.js'

describe('GET / - endpoint', () => {
  it('should can access the welcome page', async () => {
    const result = await supertest(web).get('/')

    expect(result.status).toBe(200)
    expect(result.text).toBe(`Hi, it's working`)
  })
})