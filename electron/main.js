const preinitialize = () => import(
  './actions/app/preinitialize.js'
)
const initialize = () => import(
  './actions/app/initialize.js'
)

function resolve (
  result
) {
  result.default.default()
}

async function main () {
  await preinitialize().then(
    resolve
  )

  initialize().then(
    resolve
  )
}

main()
