<template>
  <BaseModalContainer ref="modal">
    <div class="scrolling content main-modal-content-full-height">
      <ViewOptions />
      <PlayerOptions />
      <QueueOptions />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import ViewOptions from './TheSettingsModal/ViewOptions.vue'
import PlayerOptions from './TheSettingsModal/PlayerOptions.vue'
import QueueOptions from './TheSettingsModal/QueueOptions.vue'

export default {
  name: 'TheSettingsModal',
  components: {
    BaseModalContainer,
    ViewOptions,
    PlayerOptions,
    QueueOptions
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
