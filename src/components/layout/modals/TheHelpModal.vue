<template>
  <BaseModalContainer
    ref="modal"
  >
    <div class="scrolling content">
      <KeyboardShortcutsSection />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import KeyboardShortcutsSection
  from './TheHelpModal/KeyboardShortcutsSection.vue'

export default {
  name: 'TheHelpModal',
  components: {
    BaseModalContainer,
    KeyboardShortcutsSection
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
