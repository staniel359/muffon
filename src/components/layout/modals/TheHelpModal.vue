<template>
  <BaseModalContainer
    ref="modal"
    size="tiny"
  >
    <template
      #default="slotProps"
    >
      <div
        class="scrolling content large-padded"
        :class="[
          slotProps.class
        ]"
      >
        <KeyboardShortcutsSection />
      </div>
    </template>
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
