<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div
      :class="[
        'content',
        'main-modal-content-full-height'
      ]"
    >
      <div class="top-section-container">
        <SearchInput
          ref="input"
          :scope="scope"
          :collection="this[scope]"
        />

        <SearchScopeSelect
          :scope="scope"
          @select="handleScopeSelect"
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
  from '*/components/containers/modals/BaseModalContainer.vue'
import SearchInput from './SearchModal/SearchInput.vue'
import SearchScopeSelect from './SearchModal/SearchScopeSelect.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import SearchList from './SearchModal/SearchList.vue'

export default {
  name: 'SearchModal',
  components: {
    BaseModalContainer,
    SearchInput,
    SearchScopeSelect,
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

<style lang="sass" scoped>
.top-section-container
  @extend .d-flex, .align-items-center

::v-deep(.search-input)
  @extend .flex-full
</style>
