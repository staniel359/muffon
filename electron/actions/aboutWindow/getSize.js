import {
  wait
} from '../../helpers/utils.js'

export default async function () {
  await wait(
    1
  )

  const [
    width,
    height
  ] = aboutWindow.getContentSize()

  return [
    width,
    height
  ]
}
