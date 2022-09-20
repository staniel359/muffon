<template>
  <BaseImageUploadButton
    class="compact"
    @change="handleUploadChange"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import BaseImageUploadButton
  from '@/components/buttons/BaseImageUploadButton.vue'
import createBackgroundImage
  from '@/helpers/actions/api/backgroundImage/create'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'UploadButton',
  components: {
    BaseImageUploadButton
  },
  data () {
    return {
      backgroundImage: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'backgroundImages'
      ]
    )
  },
  watch: {
    backgroundImage: 'handleBackgroundImageChange'
  },
  methods: {
    createBackgroundImage,
    handleUploadChange (
      value
    ) {
      this.createBackgroundImage(
        {
          image: value.data
        }
      )
    },
    handleBackgroundImageChange (
      value
    ) {
      if (value) {
        this.addToBackgroundImages()

        this.setCurrentBackgroundImage()
      }
    },
    addToBackgroundImages () {
      const images = [
        ...this.backgroundImages,
        this.backgroundImage
      ]

      updateGlobalStore(
        {
          'layout.backgroundImages': images
        }
      )
    },
    setCurrentBackgroundImage () {
      ipcRenderer.send(
        'change-background-image',
        {
          imageId:
            this.backgroundImage.id,
          imageUrl:
            this.backgroundImage.original
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
