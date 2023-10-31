import web from './applications/web.js'

const port = process.env.APP_PORT || 3000

web.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`)
})
