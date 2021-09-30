<template>
  <BaseModalContainer ref="modal">
    <div class="content main-modal-content-full-height">
      <div class="top-section-container">
        <SearchInput
          ref="input"
          :tracks="tracks"
          :profileId="profileId"
          @select="handleSelect"
        />

        <BaseClearButton
          v-if="!isReset"
          class="reset-button"
          @click="handleResetButtonClick"
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
        v-else-if="isSave && tracks.length"
        :playlistId="playlistId"
        :tracks="tracks"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import SearchInput from './LibraryImportModal/SearchInput.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import ImportSection from './LibraryImportModal/ImportSection.vue'
import SaveSection from './LibraryImportModal/SaveSection.vue'
import { generateKey } from '#/utils'

export default {
  name: 'LibraryImportModal',
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
    playlistId: String,
    profileId: String
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
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
    isImport () {
      return (
        this.status === 'import' &&
          this.tracks.length
      )
    },
    isSave () {
      return this.status === 'save'
    }
  },
  watch: {
    profileLanguage: 'handleProfileLanguageChange'
  },
  methods: {
    handleSelect (value) {
      this.tracks.push({
        uuid: generateKey(),
        ...value
      })

      this.isReset = false
    },
    handleChange (value) {
      this.tracks = [...value]
    },
    handleResetButtonClick () {
      this.tracks = []

      this.$refs.input.clear()
      this.$refs.input.focus()

      this.status = 'import'
      this.isReset = true
    },
    handleSave () {
      this.status = 'save'
    },
    handleProfileLanguageChange () {
      this.key = generateKey()
    },
    show () {
      this.$refs.modal.show()
      this.$refs.input.focus()
    },
    hide () {
      this.$refs.modal.hide()
    },
    setTracks (value) {
      this.tracks = value
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
