const customError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class UnAuthenticationError extends customError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnAuthenticationError
