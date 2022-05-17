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
          v-if="scope"
          ref="input"
          :scope="scope"
          :collection="collection"
          @select="handleSelect"
        />

        <BaseClearButton
          v-if="isRenderClearButton"
          @click="handleClearButtonClick"
        />

        <SearchScopeSelect
          @select="handleScopeSelect"
        />
      </div>

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :scope="scope"
        :collection="collection"
        @change="handleChange"
        @save="handleSave"
      />
      <SaveSection
        v-else-if="isSave"
        :scope="scope"
        :collection="collection"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import SearchInput from './BaseProfileLibrarySearchImportModal/SearchInput.vue'
import SearchScopeSelect
  from './BaseProfileLibrarySearchImportModal/SearchScopeSelect.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import ImportSection
  from './BaseProfileLibrarySearchImportModal/ImportSection.vue'
import SaveSection from './BaseProfileLibrarySearchImportModal/SaveSection.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'BaseProfileLibrarySearchImportModal',
  components: {
    BaseModalContainer,
    SearchInput,
    SearchScopeSelect,
    BaseClearButton,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      setCollection: this.setCollection,
      hideModal: this.hide
    }
  },
  data () {
    return {
      scope: null,
      collection: [],
      status: 'import'
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
        this.status === 'save' &&
          this.collection.length
      )
    },
    isRenderClearButton () {
      return this.collection.length
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

      this.reset()

      await this.$nextTick()

      this.focusInput()
    },
    handleSelect (
      value
    ) {
      if (this.status === 'save') {
        this.reset()
      }

      this.collection.push(
        {
          uuid: generateKey(),
          ...value
        }
      )
    },
    handleChange (
      value
    ) {
      this.collection = [
        ...value
      ]
    },
    handleClearButtonClick () {
      this.reset()

      this.clearInput()

      this.focusInput()
    },
    handleSave () {
      this.status = 'save'
    },
    setCollection (
      value
    ) {
      this.collection = value
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
