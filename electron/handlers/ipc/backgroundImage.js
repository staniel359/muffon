import createBackgroundImage from '../../actions/backgroundImage/create.js'
import changeBackgroundImage from '../../actions/backgroundImage/change.js'
import resetBackgroundImage from '../../actions/backgroundImage/reset.js'
import deleteBackgroundImage from '../../actions/backgroundImage/delete.js'

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
  deleteBackgroundImage(
    {
      imageId
    }
  )
}
