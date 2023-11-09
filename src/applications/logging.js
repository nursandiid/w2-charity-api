import winston, { format } from 'winston'
import colors from 'colors'

const logger = winston.createLogger({
  level: process.env.APP_ENV === 'local' ? 'debug' : 'info',
  transports: [
    new winston.transports.File({
      filename: 'storage/logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    }),
    new winston.transports.Console({
      format: format.combine(
        format.printf((info) => {
          switch (info.level) {
            case 'error':
              info.level = colors.red(info.level)
              info.message = colors.red(info.message)
              break
            case 'info':
              info.level = colors.green(info.level)
              info.message = colors.green(info.message)
              break
            case 'warn':
              info.level = colors.yellow(info.level)
              info.message = colors.yellow(info.message)
              break
            case 'debug':
              info.level = colors.gray(info.level)
              info.message = colors.gray(info.message)
              break
            default:
              info.level = colors.white(info.level)
              info.message = colors.white(info.message)
              break
          }
        }),
        format.simple()
      )
    })
  ]
})

export default logger
