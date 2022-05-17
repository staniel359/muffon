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
          :tracks="tracks"
          :playlist-id="playlistId"
          @select="handleSelect"
        />

        <BaseClearButton
          v-if="!isReset"
          @click="handleClearButtonClick"
        />
      </div>

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :tracks="tracks"
        @change="handleChange"
        @save="handleSave"
      />
      <SaveSection
        v-else-if="isSave"
        :playlist-id="playlistId"
        :tracks="tracks"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import SearchInput from './BasePlaylistLibraryImportModal/SearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import ImportSection from './BasePlaylistLibraryImportModal/ImportSection.vue'
import SaveSection from './BasePlaylistLibraryImportModal/SaveSection.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'BasePlaylistLibraryImportModal',
  components: {
    BaseModalContainer,
    SearchInput,
    BaseClearButton,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      hideModal: this.hide,
      setTracks: this.setTracks
    }
  },
  props: {
    playlistId: String
  },
  data () {
    return {
      key: null,
      isReset: true,
      tracks: [],
      status: 'import'
    }
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    ),
    isImport () {
      return (
        this.status === 'import' &&
          this.tracks.length
      )
    },
    isSave () {
      return (
        this.status === 'save' &&
          this.tracks.length
      )
    }
  },
  watch: {
    profileLanguage: 'handleProfileLanguageChange'
  },
  methods: {
    handleVisible () {
      this.focusInput()
    },
    handleSelect (
      value
    ) {
      if (this.status === 'save') {
        this.reset()
      }

      this.tracks.push(
        {
          uuid: generateKey(),
          ...value
        }
      )

      this.isReset = false
    },
    handleChange (
      value
    ) {
      this.tracks = [
        ...value
      ]
    },
    handleClearButtonClick () {
      this.reset()

      this.clearInput()

      this.focusInput()

      this.isReset = true
    },
    handleSave () {
      this.status = 'save'
    },
    handleProfileLanguageChange () {
      this.key = generateKey()
    },
    setTracks (
      value
    ) {
      this.tracks = value
    },
    reset () {
      this.status = 'import'

      this.tracks = []
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

<style lang="sass" scoped>
.top-section-container
  @extend .d-flex, .align-items-center
</style>
