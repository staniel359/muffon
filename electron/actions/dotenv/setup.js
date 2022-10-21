const dotenv = require(
  'dotenv'
)
const path = require(
  'path'
)

function setup () {
  const envFilePath =
    path.join(
      __dirname,
      '../../../.env'
    )

  const options = {
    path: envFilePath
  }

  dotenv.config(
    options
  )
}

module.exports = setup
