import getViews from '../views/get.js'
import changeViewBackgroundColor
  from '../view/changeBackgroundColor.js'

export default function () {
  getViews()
    .forEach(
      changeViewBackgroundColor
    )
}
