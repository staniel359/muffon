<template>
  <BaseModalContainer
    ref="modal"
    is-search-modal
    @visible="handleVisible"
  >
    <SearchContent
      ref="search"
    />
  </BaseModalContainer>
</template>

<script>
import {
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
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
    this.setSearchModal(
      this.$refs.modal
    )
  },
  methods: {
    ...mapActions(
      layoutStore,
      [
        'setSearchModal'
      ]
    ),
    handleVisible () {
      this.focusInput()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    focusInput () {
      this.$refs
        .search
        .focusInput()
    }
  }
}
</script>

<style lang="sass" scoped>
.main-modal
  top: calc((100vh - #{$mainModalHeight}) / 2)
</style>
