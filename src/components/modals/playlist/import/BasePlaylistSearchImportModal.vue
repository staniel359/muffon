<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="content full-height">
      <div class="main-search-container">
        <SearchInput
          ref="input"
          :tracks="collection"
          :source="source"
          :is-save="isSave"
        />

        <SourceSelect
          :source="source"
          @select="handleSourceSelect"
        />

        <BaseClearButton
          v-if="collection.length"
          @click="handleClearButtonClick"
        />
      </div>

      <BaseDivider />

      <BaseImportSection
        v-if="isImport"
        scope="tracks"
        :collection="collection"
      />
      <BasePlaylistSaveSection
        v-else-if="isSave"
        :playlist-id="playlistId"
        :tracks="collection"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import SearchInput from './BasePlaylistSearchImportModal/SearchInput.vue'
import SourceSelect from './BasePlaylistSearchImportModal/SourceSelect.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseImportSection from '@/components/import/BaseImportSection.vue'
import BasePlaylistSaveSection
  from '@/components/save/playlist/BasePlaylistSaveSection.vue'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'BasePlaylistSearchImportModal',
  components: {
    BaseModalContainer,
    SearchInput,
    SourceSelect,
    BaseClearButton,
    BaseDivider,
    BaseImportSection,
    BasePlaylistSaveSection
  },
  mixins: [
    collectionMixin
  ],
  provide () {
    return {
      save: this.save,
      retry: this.retry,
      reset: this.reset,
      hideModal: this.hide
    }
  },
  props: {
    playlistId: String
  },
  data () {
    return {
      collection: [],
      source: 'lastfm',
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
        this.status === 'save'
      )
    }
  },
  methods: {
    handleVisible () {
      this.focusInput()
    },
    handleClearButtonClick () {
      this.reset()

      this.clearInput()

      this.focusInput()
    },
    handleSourceSelect (
      value
    ) {
      this.source = value

      this.focusInput()
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
    clearInput () {
      this.$refs
        .input
        .clear()
    },
    focusInput () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
