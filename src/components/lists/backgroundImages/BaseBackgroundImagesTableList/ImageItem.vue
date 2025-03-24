<template>
  <div
    class="column main-image-list-item selectable"
    :class="{
      active: isActive
    }"
  >
    <BaseImage
      class="rounded-medium"
      :image="image"
      @click="handleClick"
    />

    <ClearButton
      v-if="imageId"
      :image-id="imageId"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseImage from '@/components/images/BaseImage.vue'
import ClearButton from './ImageItem/ClearButton.vue'
import {
  getLink as getImageFileLink
} from '@/helpers/actions/imageFile'

export default {
  name: 'ImageItem',
  components: {
    BaseImage,
    ClearButton
  },
  props: {
    imageData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      imageLink: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'backgroundImageId'
      ]
    ),
    isActive () {
      return (
        this.imageId ===
          this.backgroundImageId
      )
    },
    imageId () {
      return this.imageData.id
    },
    image () {
      if (this.imageId) {
        return this.imageLink
      } else {
        return this.imagePath
      }
    },
    imagePath () {
      return this.imageData.path
    },
    changeArgs () {
      return {
        imageId: this.imageId,
        imagePath: this.imagePath
      }
    }
  },
  async mounted () {
    if (this.imageId) {
      this.imageLink =
        await getImageFileLink(
          this.imagePath
        )
    }
  },
  methods: {
    handleClick () {
      if (this.imageId) {
        this.setBackgroundImage()
      } else {
        this.setDefaultBackgroundImage()
      }
    },
    setBackgroundImage () {
      window
        .mainProcess
        .sendCommand(
          'change-background-image',
          this.changeArgs
        )
    },
    setDefaultBackgroundImage () {
      window
        .mainProcess
        .sendCommand(
          'reset-background-image'
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
