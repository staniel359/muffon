<template>
  <div id="the-background-observer" />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'TheBackgroundObserver',
  computed: {
    ...mapState(
      'layout',
      [
        'backgroundImages',
        'backgroundImageId'
      ]
    )
  },
  mounted () {
    ipcRenderer.on(
      'change-background-image',
      this.handleChangeBackgroundImage
    )

    ipcRenderer.on(
      'reset-background-image',
      this.handleResetBackgroundImage
    )

    ipcRenderer.on(
      'delete-background-image',
      this.handleDeleteBackgroundImage
    )
  },
  methods: {
    handleChangeBackgroundImage (
      _,
      {
        imageId,
        imagePath
      }
    ) {
      updateGlobalStore(
        {
          'layout.backgroundImageId': imageId,
          'layout.backgroundImagePath': imagePath
        }
      )
    },
    handleResetBackgroundImage () {
      this.resetBackgroundImage()
    },
    handleDeleteBackgroundImage (
      _,
      {
        imageId
      }
    ) {
      this.resetIfActive(
        imageId
      )

      this.removeFromBackgroundImages(
        imageId
      )
    },
    resetBackgroundImage () {
      updateGlobalStore(
        {
          'layout.backgroundImageId': 0,
          'layout.backgroundImagePath': null
        }
      )
    },
    resetIfActive (
      imageId
    ) {
      const isActive = (
        imageId ===
          this.backgroundImageId
      )

      if (isActive) {
        this.resetBackgroundImage()
      }
    },
    removeFromBackgroundImages (
      imageId
    ) {
      function isMatchedImage (
        imageData
      ) {
        return imageData.id !== imageId
      }

      const images = [
        ...this.backgroundImages.filter(
          isMatchedImage
        )
      ]

      updateGlobalStore(
        {
          'layout.backgroundImages': images
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
