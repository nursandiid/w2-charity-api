import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import { strRandom, addLeadingZero } from '../../src/utils/helpers.js'

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

it('should be able to generate random string', () => {
  const str = strRandom(25)

  expect(str).toBeDefined()
  expect(str.length).toBe(25)
})

it('should be able to generate order number', () => {
  const orderNumber = 'PX' + addLeadingZero(Math.floor(Math.random() * 999999), 6)

  console.log(orderNumber)
});
