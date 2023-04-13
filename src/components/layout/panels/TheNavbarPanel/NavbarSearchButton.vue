<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      icon="search"
      @click="handleClick"
    />
  </div>
</template>

<script>
import {
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'NavbarSearchButton',
  components: {
    BaseButton
  },
  methods: {
    ...mapActions(
      layoutStore,
      [
        'setIsSearchPanelVisible'
      ]
    ),
    handleClick () {
      this.setIsSearchPanelVisible(
        true
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
