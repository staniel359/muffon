<template>
  <div
    class="ui tiny compact icon button"
    ref="button"
    :data-content="popupTextFormatted"
    :class="{
      disabled: !queueTracksLength,
      basic: !isQueuePanelVisible
    }"
    @click="handleClick"
  >
    <i class="list ul icon" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { toggleQueuePanel } from '#/actions/layout'
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'QueueButton',
  computed: {
    ...mapState('layout', [
      'isQueuePanelVisible'
    ]),
    ...mapGetters('queue', {
      queueTracksLength: 'tracksLength'
    }),
    popupTextFormatted () {
      return localize('layout.player.queue')
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
