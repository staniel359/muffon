<template>
  <div
    class="ui modal main-modal main-modal-full-height"
    ref="modal"
  >
    <div class="ui scrolling content">
      <PlayerOptions />
      <QueueOptions />
    </div>
  </div>
</template>

<script>
import PlayerOptions from './TheSettingsModal/PlayerOptions.vue'
import QueueOptions from './TheSettingsModal/QueueOptions.vue'
import { mainModalOptions } from '#/data/plugins/semantic'
import { setModal, showModal } from '#/actions/plugins/semantic'

export default {
  name: 'TheSettingsModal',
  components: {
    PlayerOptions,
    QueueOptions
  },
  mounted () {
    setModal(
      this.$refs.modal,
      mainModalOptions()
    )
  },
  methods: {
    show () {
      showModal(this.$refs.modal)
    }
  }
}
</script>

<style lang="sass" scoped></style>
