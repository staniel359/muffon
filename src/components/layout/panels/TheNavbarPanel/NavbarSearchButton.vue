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
} from 'vuex'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'NavbarSearchButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      'layout',
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
