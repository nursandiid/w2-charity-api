import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

it('should be able to generate string with uuid', () => {
  const str = uuid()

  expect(str).toBeDefined()
})

it('should be able to generate string with bcrypt', async () => {
  const str = await bcrypt.hash('123456', 10)

  expect(await bcrypt.compare('123456', str)).toBeTruthy()
})

it('should be able to generate string for jwt token', async () => {
  const str = await bcrypt.hash(uuid(), 10)

  console.log(str)
  expect(str).toBeDefined()
})