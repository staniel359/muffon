<template>
  <div class="column main-image-list-item">
    <BaseImage
      class="rounded-medium"
      :image="imageUrl"
    />

    <BaseClearButton
      class="main-image-clear-button"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

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

<style lang="sass" scoped></style>
