<template>
  <BaseImageUploadButton
    class="small"
    :is-with-text="false"
    @change="handleUploadChange"
  />
</template>

<script>
import BaseImageUploadButton
  from '@/components/buttons/BaseImageUploadButton.vue'

export default {
  name: 'ImagesButton',
  components: {
    BaseImageUploadButton
  },
  inject: [
    'addCollectionItem'
  ],
  methods: {
    handleUploadChange (
      value
    ) {
      this.addCollectionItem(
        {
          collection: 'images',
          item: value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
