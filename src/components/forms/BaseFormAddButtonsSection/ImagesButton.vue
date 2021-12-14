<template>
  <label>
    <BaseButton
      class="compact"
      icon="image"
    />

    <BaseImageInput
      @change="handleImageChange"
    />
  </label>
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BaseImageInput from '@/inputs/BaseImageInput.vue'

export default {
  name: 'ImagesButton',
  components: {
    BaseButton,
    BaseImageInput
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'change'
  ],
  methods: {
    handleImageChange (value) {
      const images = [
        ...this.images,
        value
      ]

      this.$emit(
        'change',
        images
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
