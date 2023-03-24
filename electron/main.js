import preinitialize from './actions/app/preinitialize.js'

const initialize = import(
  './actions/app/initialize.js'
)

function handlePreinitialize () {
  initialize.then(
    result => {
      result.default()
    }
  )
}

preinitialize().then(
  handlePreinitialize
)
