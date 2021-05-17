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
    Mousetrap.bind('ctrl+f', this.show, 'keyup')
  },
  methods: {
    handleVisible () {
      this.$refs.search.focusInput()
    },
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped>
.main-modal
  top: calc((100vh - #{$mainModalHeight}) / 2)
</style>
