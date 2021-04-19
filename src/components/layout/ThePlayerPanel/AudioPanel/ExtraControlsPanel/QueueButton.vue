<template>
  <div
    class="ui tiny compact icon button"
    ref="button"
    :data-content="popupTextFormatted"
    :class="{
      disabled: isQueueEmpty,
      basic: !isQueuePanelVisible
    }"
    @click="handleClick"
  >
    <i class="list ul icon" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toggleQueuePanel } from '#/actions/layout'
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'
import { getTracksCount as getQueueTracksCount } from '#/actions/queue'

export default {
  name: 'QueueButton',
  computed: {
    ...mapState('layout', [
      'isQueuePanelVisible'
    ]),
    popupTextFormatted () {
      return localize('layout.player.queue')
    },
    isQueueEmpty () {
      return !getQueueTracksCount()
    }
  },
  mounted () {
    setPopup(
      this.$refs.button,
      popupOptions()
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
