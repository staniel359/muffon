<template>
  <div
    class="ui card main-simple-card"
    :class="{ inverted: isDarkMode }"
  >
    <div></div>
    <div
      v-if="isWithImage"
      class="main-simple-card-image-container"
    >
      <BaseImage
        class="rounded bordered"
        :model="model"
        :image="image"
      />
    </div>

    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseImage from '*/components/images/BaseImage.vue'

export default {
  name: 'BaseSimpleCardContainer',
  components: {
    BaseImage
  },
  props: {
    isWithImage: {
      type: Boolean,
      default: true
    },
    image: String,
    model: String
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
