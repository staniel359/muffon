<template>
  <BaseModalContainer ref="modal">
    <div class="content main-modal-content-full-height">
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
          class="reset-button"
          @click="handleResetButtonClick"
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
    async handleScopeSelect (
      value
    ) {
      this.scope = value

      this.reset()

      await this.$nextTick()

      this.$refs
        .input
        .focus()
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
    handleResetButtonClick () {
      this.reset()

      this.$refs
        .input
        .clear()

      this.$refs
        .input
        .focus()
    },
    handleSave () {
      this.status = 'save'
    },
    reset () {
      this.status = 'import'

      this.collection = []
    },
    show () {
      this.$refs
        .modal
        .show()

      this.$refs
        .input
        .focus()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    setCollection (
      value
    ) {
      this.collection = value
    }
  }
}
</script>

<style lang="sass" scoped>
.top-section-container
  @extend .d-flex, .align-items-center

.reset-button
  margin-left: 1em !important
</style>
