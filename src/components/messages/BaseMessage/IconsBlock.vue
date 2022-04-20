<template>
  <i
    class="icons icon-group"
  >
    <BaseIcon
      v-for="(icon, index) in icons"
      :key="index"
      :icon="icon"
    />
  </i>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'IconsBlock',
  components: {
    BaseIcon
  },
  props: {
    icons: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.icon-group
  font-size: 3em
  margin-right: 0.5em
</style>
