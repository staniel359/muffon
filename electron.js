const { app } = require('electron');

app.commandLine.appendSwitch('try-supported-channel-layouts');

const preinitialize = require(
  './electron/actions/app/preinitialize'
)

preinitialize()

const setGlobalVariables = require(
  './electron/actions/app/setGlobalVariables'
)
const setEvents = require(
  './electron/actions/app/setEvents'
)
const initialize = require(
  './electron/actions/app/initialize'
)

setGlobalVariables()

setEvents()

initialize()
