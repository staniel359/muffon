import createBackgroundImage from '#/actions/backgroundImage/create'
import changeBackgroundImage from '#/actions/backgroundImage/change'
import resetBackgroundImage from '#/actions/backgroundImage/reset'
import deleteBackgroundImage from '#/actions/backgroundImage/delete'

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
