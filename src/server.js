import web from './applications/web.js'
import logger from './applications/logging.js'

const port = process.env.APP_PORT || 3000

web.listen(port, () => {
  logger.info(`Server up and running on http://localhost:${port}`)
})
