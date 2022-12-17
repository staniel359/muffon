<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      icon="queue"
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
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  toggleQueuePanel
} from '@/helpers/actions/layout'

export default {
  name: 'NavbarQueueButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      layoutStore,
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
