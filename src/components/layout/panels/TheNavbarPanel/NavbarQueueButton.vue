<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      icon="list ul"
      :class="{
        active: isQueuePanelVisible
      }"
      @click="handleClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseButton from '*/components/buttons/BaseButton.vue'
import {
  toggleQueuePanel
} from '*/helpers/actions/layout'

export default {
  name: 'NavbarQueueButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isQueuePanelVisible'
      ]
    )
  },
  methods: {
    handleClick () {
      toggleQueuePanel()
    }
  }
}
</script>

<style lang="sass" scoped></style>
