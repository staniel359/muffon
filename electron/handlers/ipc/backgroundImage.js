import createBackgroundImage from '../../actions/backgroundImage/create.js'
import changeBackgroundImage from '../../actions/backgroundImage/change.js'
import resetBackgroundImage from '../../actions/backgroundImage/reset.js'
import removeBackgroundImage from '../../actions/backgroundImage/remove.js'

export function handleCreateBackgroundImage (
  _,
  {
    tabId,
    imageData
  }
) {
  createBackgroundImage(
    {
      tabId,
      imageData
    }
  )
}

export function handleChangeBackgroundImage (
  _,
  {
    imageId,
    imagePath
  }
) {
  changeBackgroundImage(
    {
      imageId,
      imagePath
    }
  )
}

export function handleResetBackgroundImage () {
  resetBackgroundImage()
}

export function handleDeleteBackgroundImage (
  _,
  {
    imageId
  }
) {
  removeBackgroundImage(
    {
      imageId
    }
  )
}
