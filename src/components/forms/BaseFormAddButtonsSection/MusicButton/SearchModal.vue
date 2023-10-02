<template>
  <BaseModalContainer
    ref="modal"
    is-multiple
    @visible="handleVisible"
  >
    <div class="content full-height">
      <div class="main-search-container">
        <SearchInput
          ref="input"
          :scope="scope"
          :source="source"
          :collection="this[scope]"
        />

        <ScopeSelect
          :scope="scope"
          @select="handleScopeSelect"
        />

        <SourceSelect
          :scope="scope"
          :source="source"
          @select="handleSourceSelect"
        />
      </div>

      <BaseDivider />

      <SearchList
        :scope="scope"
        :collection="this[scope]"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import SearchInput from './SearchModal/SearchInput.vue'
import ScopeSelect from './SearchModal/ScopeSelect.vue'
import SourceSelect from './SearchModal/SourceSelect.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import SearchList from './SearchModal/SearchList.vue'

export default {
  name: 'SearchModal',
  components: {
    BaseModalContainer,
    SearchInput,
    ScopeSelect,
    SourceSelect,
    BaseDivider,
    SearchList
  },
  provide () {
    return {
      hideModal: this.hide
    }
  },
  props: {
    artists: Array,
    albums: Array,
    tracks: Array
  },
  data () {
    return {
      source: 'lastfm',
      scope: 'artists'
    }
  },
  methods: {
    handleVisible () {
      this.focusInput()
    },
    async handleScopeSelect (
      value
    ) {
      this.scope = value

      await this.$nextTick()

      this.focusInput()

      this.clearInput()
    },
    async handleSourceSelect (
      value
    ) {
      this.source = value

      await this.$nextTick()

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
        .input
        .focus()
    },
    clearInput () {
      this.$refs
        .input
        .clear()
    }
  }
}
</script>

<style lang="sass" scoped></style>
