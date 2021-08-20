<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      icon="redo alternate"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/BaseButton.vue'

export default {
  name: 'NavbarRefreshButton',
  components: {
    BaseButton
  },
  inject: [
    'refresh'
  ],
  methods: {
    handleClick () {
      this.refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
