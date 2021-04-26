<template>
  <div
    class="ui card main-simple-card"
    :class="{ inverted: isDarkMode }"
  >
    <div></div>
    <div
      v-if="image"
      class="main-simple-card-image-container"
    >
      <BaseImage
        :image="image"
        :isCircular="isImageCircular"
        isRounded
        isBordered
      />
    </div>

    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseImage from '@/BaseImage.vue'

export default {
  name: 'BaseSimpleCardContainer',
  components: {
    BaseImage
  },
  props: {
    image: String,
    isImageCircular: Boolean
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
