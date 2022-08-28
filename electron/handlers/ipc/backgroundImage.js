const changeBackgroundImage = require(
  '../../actions/backgroundImage/change'
)
const resetBackgroundImage = require(
  '../../actions/backgroundImage/reset'
)
const removeBackgroundImage = require(
  '../../actions/backgroundImage/remove'
)

function handleChangeBackgroundImage (
  _,
  {
    imageId,
    imageUrl
  }
) {
  changeBackgroundImage(
    {
      imageId,
      imageUrl
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
  handleChangeBackgroundImage,
  handleResetBackgroundImage,
  handleDeleteBackgroundImage
}
