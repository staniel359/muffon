<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="content full-height">
      <div class="top-section-container">
        <SearchInput
          ref="input"
          :scope="scope"
          :collection="collection"
          :is-save="isSave"
        />

        <BaseClearButton
          v-if="collection.length"
          @click="handleClearButtonClick"
        />

        <ScopeSelect
          :selected="scope"
        />
      </div>

      <BaseDivider />

      <BaseImportSection
        v-if="isImport"
        :scope="scope"
        :collection="collection"
      />
      <BaseLibrarySaveSection
        v-else-if="isSave"
        :scope="scope"
        :collection="collection"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import SearchInput
  from './BaseLibrarySearchImportModal/SearchInput.vue'
import ScopeSelect from './BaseLibrarySearchImportModal/ScopeSelect.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseImportSection from '@/components/import/BaseImportSection.vue'
import BaseLibrarySaveSection
  from '@/components/save/library/BaseLibrarySaveSection.vue'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'BaseLibrarySearchImportModal',
  components: {
    BaseModalContainer,
    SearchInput,
    ScopeSelect,
    BaseClearButton,
    BaseDivider,
    BaseImportSection,
    BaseLibrarySaveSection
  },
  mixins: [
    collectionMixin
  ],
  provide () {
    return {
      setScope: this.setScope,
      save: this.save,
      retry: this.retry,
      reset: this.reset,
      hideModal: this.hide
    }
  },
  data () {
    return {
      scope: 'artists',
      status: 'import',
      collection: []
    }
  },
  computed: {
    isImport () {
      return (
        this.status === 'import' &&
          this.collection.length
      )
    },
    isSave () {
      return (
        this.status === 'save'
      )
    }
  },
  watch: {
    scope: 'handleScopeChange'
  },
  methods: {
    handleVisible () {
      this.focusInput()
    },
    async handleScopeChange () {
      this.reset()

      await this.$nextTick()

      this.focusInput()
    },
    handleClearButtonClick () {
      this.reset()

      this.clearInput()

      this.focusInput()
    },
    setScope (
      value
    ) {
      this.scope = value
    },
    save () {
      this.status = 'save'
    },
    retry (
      value
    ) {
      this.collection = [
        ...value
      ]
    },
    reset () {
      this.status = 'import'

      this.collection = []
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
</style>
