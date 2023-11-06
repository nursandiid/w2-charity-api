import supertest from 'supertest'
import web from '../../src/applications/web.js'

describe('POST /api/campaign', () => {
  it.skip('should can upload image with valid extension', async () => {
    const result = await supertest(web)
      .post('/api/campaign')
      .attach('path_image', process.cwd() + '/test/file-test/1.png')

    expect(result.status).toBe(200)
  })
})
