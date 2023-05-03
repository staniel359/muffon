<template>
  <div
    class="item main-sidebar-item top-item"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="icon-image-container">
      <BaseImage
        class="main-logo-image"
        :image="logo"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseImage from '@/components/images/BaseImage.vue'
import logo from '@/assets/images/logo.png'

export default {
  name: 'RootItem',
  components: {
    BaseImage
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    logo () {
      return logo
    }
  }
}
</script>

<style lang="sass" scoped></style>
