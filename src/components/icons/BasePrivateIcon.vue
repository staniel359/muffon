<template>
  <BaseIcon
    class="grey main-icon height-fit-content"
    icon="private"
    :class="iconClass"
  />
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BasePrivateIcon',
  components: {
    BaseIcon
  },
  props: {
    isSmall: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconClass () {
      if (this.isSmall) {
        return 'small main-right-extrasmall-section'
      } else {
        return 'main-right-mini-section'
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
