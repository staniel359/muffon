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
    data
  }
) {
  createBackgroundImage(
    {
      tabId,
      data
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
