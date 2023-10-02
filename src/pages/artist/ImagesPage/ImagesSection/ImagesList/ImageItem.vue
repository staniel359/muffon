<template>
  <div>
    <div class="main-image-container">
      <BaseImage
        class="rounded main-zoomable-image"
        :image="imageData.small"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'

export default {
  name: 'ImageItem',
  components: {
    BaseImage
  },
  props: {
    imageData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  emits: [
    'click'
  ],
  methods: {
    handleClick () {
      this.$emit(
        'click',
        this.index
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
