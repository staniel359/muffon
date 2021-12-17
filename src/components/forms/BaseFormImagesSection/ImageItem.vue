<template>
  <div class="post-image-container">
    <BaseImage
      :image="imageUrl"
    />

    <BaseButton
      class="red basic compact small delete-button"
      icon="close"
      :text="deleteText"
      @click="handleDeleteButtonClick"
    />
  </div>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
import BaseButton from '@/buttons/BaseButton.vue'

export default {
  name: 'ImageItem',
  components: {
    BaseImage,
    BaseButton
  },
  props: {
    imageData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'deleteButtonClick'
  ],
  computed: {
    imageUrl () {
      return this.imageData.url
    },
    deleteText () {
      return this.$t(
        'actions.delete'
      )
    },
    uuid () {
      return this.imageData.uuid
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick',
        { uuid: this.uuid }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.post-image-container
  @extend .text-align-center, .d-inline-block
  margin: 0.5em 1em 0.5em 0
  & > .image
    max-height: 100px
    margin-bottom: 0.5em

.delete-button
  @extend .no-margin
</style>
