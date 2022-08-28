const {
  app
} = require(
  'electron'
)

function exit () {
  app.exit()
}

module.exports = exit
