const createBackgroundImage = require(
  '../../actions/backgroundImage/create'
)
const changeBackgroundImage = require(
  '../../actions/backgroundImage/change'
)
const resetBackgroundImage = require(
  '../../actions/backgroundImage/reset'
)
const removeBackgroundImage = require(
  '../../actions/backgroundImage/remove'
)

function handleCreateBackgroundImage (
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

function handleChangeBackgroundImage (
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

function handleResetBackgroundImage () {
  resetBackgroundImage()
}

function handleDeleteBackgroundImage (
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

module.exports = {
  handleCreateBackgroundImage,
  handleChangeBackgroundImage,
  handleResetBackgroundImage,
  handleDeleteBackgroundImage
}
