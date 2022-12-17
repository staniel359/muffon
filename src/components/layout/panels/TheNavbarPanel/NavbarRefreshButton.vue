<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      icon="refresh"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'NavbarRefreshButton',
  components: {
    BaseButton
  },
  inject: [
    'refreshPage'
  ],
  methods: {
    handleClick () {
      this.refreshPage()
    }
  }
}
</script>

<style lang="sass" scoped></style>
