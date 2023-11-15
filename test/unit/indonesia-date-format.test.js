import { convertDateToIndonesianFormat } from '../../src/utils/helpers.js'

it('should be able to generate date in indonesia format', () => {
  expect(convertDateToIndonesianFormat('2023-11-15')).toBe('15 November 2023')
  expect(convertDateToIndonesianFormat('2023-10-13')).toBe('13 Oktober 2023')
})
