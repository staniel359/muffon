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
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'NavbarSearchButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'searchModal'
      ]
    )
  },
  methods: {
    handleClick () {
      this.searchModal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
