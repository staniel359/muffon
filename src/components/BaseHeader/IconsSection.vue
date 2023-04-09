<template>
  <i
    class="icons"
    :class="{
      big: isPage
    }"
  >
    <BaseIcon
      v-for="(icon, index) in icons"
      :key="index"
      :icon="icon"
    />
  </i>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'IconsSection',
  components: {
    BaseIcon
  },
  props: {
    icons: Array,
    isPage: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
