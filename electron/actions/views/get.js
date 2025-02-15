import getTabs from '../tabs/get.js'

export default function () {
  return [
    mainView,
    aboutView,
    ...getTabs()
  ]
}
