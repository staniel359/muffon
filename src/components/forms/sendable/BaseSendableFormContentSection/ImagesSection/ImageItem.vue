<template>
  <div class="post-image-container">
    <BaseImage
      :image="imageUrl"
    />

    <BaseClearButton
      class="clear-button"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'ImageItem',
  components: {
    BaseImage,
    BaseClearButton
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    imageData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl () {
      return this.imageData.url
    },
    uuid () {
      return this.imageData.uuid
    }
  },
  methods: {
    handleClearButtonClick () {
      this.deleteCollectionItem(
        {
          collection: 'images',
          uuid: this.uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.post-image-container
  @extend .text-align-center, .d-inline-block
  margin: 0em 1em 1em 0
  & > .image
    max-height: 100px

.clear-button
  @extend .no-margin
  margin-top: 0.5em !important
</style>
