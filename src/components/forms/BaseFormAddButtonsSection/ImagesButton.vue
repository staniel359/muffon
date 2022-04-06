<template>
  <BaseButton
    class="compact"
    icon="image"
    @click="handleClick"
  />

  <BaseImageInput
    ref="input"
    @change="handleImageChange"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseImageInput from '*/components/inputs/BaseImageInput.vue'

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
    handleClick () {
      this.$refs.input.show()
    },
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
