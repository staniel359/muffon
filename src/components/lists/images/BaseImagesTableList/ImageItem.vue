<template>
  <div
    class="image-item"
    :class="{
      active: isActive
    }"
  >
    <BaseImage
      class="rounded"
      :class="{
        clickable: isClickable
      }"
      :image="imageData[size]"
      @click="handleClick"
    />

    <ClearButton
      v-if="isRenderClearButton"
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
import BaseImage from '*/components/images/BaseImage.vue'
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
    },
    size: {
      type: String,
      required: true
    },
    isWithClearButton: Boolean,
    isClickable: Boolean
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
    },
    isRenderClearButton () {
      return (
        this.isWithClearButton &&
          this.imageId
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
.image-item
  @extend .d-flex, .flex-column
  align-self: center
  &.active
    border: 1px solid $colorBaseLight
    border-radius: 5px
  &:hover
    .clear-button
      @extend .d-block
  .image
    &.clickable
      @extend .cursor-pointer
</style>
