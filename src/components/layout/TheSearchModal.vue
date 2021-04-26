<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <SearchContent ref="search" />
  </BaseModalContainer>
</template>

<script>
import Mousetrap from 'mousetrap'
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import SearchContent from './TheSearchModal/SearchContent.vue'

export default {
  name: 'TheSearchModal',
  components: {
    BaseModalContainer,
    SearchContent
  },
  provide () {
    return {
      hideSearch: this.hide
    }
  },
  mounted () {
    this.setKeyBindings()
  },
  methods: {
    handleVisible () {
      this.focusInput()
    },
    setKeyBindings () {
      Mousetrap.bind('ctrl+f', this.toggle, 'keyup')
      Mousetrap.bind('ctrl+f', this.unfocusInput)
    },
    hide () {
      this.$refs.modal.hide()
    },
    toggle () {
      this.$refs.modal.toggle()
    },
    focusInput () {
      this.$refs.search.focusInput()
    },
    unfocusInput () {
      this.$refs.search.unfocusInput()
    }
  }
}
</script>

<style lang="sass" scoped>
.main-modal
  top: calc((100vh - #{$mainModalHeight}) / 2)
</style>
