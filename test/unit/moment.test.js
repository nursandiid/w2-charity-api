import moment from 'moment'

it('should can print date with moment', () => {
  const startDate = moment().subtract(1, 'month')
  const endDate = moment()

  const diff = endDate.diff(startDate, 'days')

  console.log(diff)
})
