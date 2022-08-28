const {
  app
} = require(
  'electron'
)
const {
  handleAllWindowsClosed
} = require(
  '../handlers/app'
)

app.on(
  'window-all-closed',
  handleAllWindowsClosed
)
