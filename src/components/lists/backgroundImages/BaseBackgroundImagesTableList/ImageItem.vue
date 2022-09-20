<template>
  <div
    class="column main-image-item"
    :class="{
      active: isActive
    }"
  >
    <BaseImage
      class="rounded bordered"
      :image="imageData.original"
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
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import BaseImage from '@/components/images/BaseImage.vue'
import ClearButton from './ImageItem/ClearButton.vue'

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
  computed: {
    ...mapState(
      'layout',
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
    imageUrl () {
      return this.imageData.original
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
      ipcRenderer.send(
        'change-background-image',
        {
          imageId: this.imageId,
          imageUrl: this.imageUrl
        }
      )
    },
    setDefaultBackgroundImage () {
      ipcRenderer.send(
        'reset-background-image'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-image-item
  &.active
    border: $borderBaseLight
    border-radius: 5px
  .image
    @extend .cursor-pointer
</style>
