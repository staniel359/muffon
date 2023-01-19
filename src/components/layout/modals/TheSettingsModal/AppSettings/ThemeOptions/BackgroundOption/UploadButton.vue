<template>
  <BaseImageUploadButton
    class="compact"
    @change="handleUploadChange"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  ipcRenderer
} from 'electron'
import BaseImageUploadButton
  from '@/components/buttons/BaseImageUploadButton.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'UploadButton',
  components: {
    BaseImageUploadButton
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'backgroundImages',
        'tabId'
      ]
    )
  },
  mounted () {
    ipcRenderer.on(
      'create-background-image',
      this.handleCreateBackgroundImage
    )
  },
  methods: {
    handleUploadChange (
      {
        data
      }
    ) {
      const createArgs = {
        tabId: this.tabId,
        imageData: data
      }

      ipcRenderer.send(
        'create-background-image',
        createArgs
      )
    },
    handleCreateBackgroundImage (
      _,
      imageData
    ) {
      this.addToBackgroundImages(
        imageData
      )

      this.setCurrentBackgroundImage(
        imageData
      )
    },
    addToBackgroundImages (
      imageData
    ) {
      const images = [
        ...this.backgroundImages,
        imageData
      ]

      updateGlobalStore(
        {
          'layout.backgroundImages': images
        }
      )
    },
    setCurrentBackgroundImage (
      imageData
    ) {
      ipcRenderer.send(
        'change-background-image',
        {
          imageId: imageData.id,
          imagePath: imageData.path
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
