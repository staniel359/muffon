<template>
  <BaseModalContainer ref="modal">
    <div class="content main-modal-content-full-height">
      <div class="top-section-container">
        <Component
          ref="input"
          :is="activeInput.component"
          :[activeInput.scope]="this[activeInput.scope]"
          @select="handleSelect"
        />

        <SearchScopeSelect
          @select="handleScopeSelect"
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
        :artists="artists"
        :albums="albums"
        :tracks="tracks"
        :scope="scope"
        @change="handleChange"
        @save="handleSave"
      />
      <SaveSection
        v-else-if="isSave"
        :artists="artists"
        :albums="albums"
        :tracks="tracks"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import SearchArtistsInput
  from './SearchImportModal/inputs/SearchArtistsInput.vue'
import SearchAlbumsInput
  from './SearchImportModal/inputs/SearchAlbumsInput.vue'
import SearchTracksInput
  from './SearchImportModal/inputs/SearchTracksInput.vue'
import SearchScopeSelect from './SearchImportModal/SearchScopeSelect.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import ImportSection from './SearchImportModal/ImportSection.vue'
import SaveSection from './SearchImportModal/SaveSection.vue'
import { generateKey } from '#/utils'

export default {
  name: 'SearchImportModal',
  components: {
    BaseModalContainer,
    SearchArtistsInput,
    SearchAlbumsInput,
    SearchTracksInput,
    SearchScopeSelect,
    BaseClearButton,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      setArtists: this.setArtists,
      setAlbums: this.setAlbums,
      setTracks: this.setTracks,
      hideModal: this.hide
    }
  },
  data () {
    return {
      isReset: true,
      artists: [],
      albums: [],
      tracks: [],
      status: 'import',
      scope: 'artists',
      inputs: [
        {
          component: 'SearchArtistsInput',
          scope: 'artists'
        },
        {
          component: 'SearchAlbumsInput',
          scope: 'albums'
        },
        {
          component: 'SearchTracksInput',
          scope: 'tracks'
        }
      ]
    }
  },
  computed: {
    isImport () {
      return (
        this.status === 'import' &&
          (
            this.artists.length ||
              this.albums.length ||
              this.tracks.length
          )
      )
    },
    activeInput () {
      const isActiveInput = inputData => {
        return inputData.scope === this.scope
      }

      return this.inputs.find(
        isActiveInput
      )
    },
    isSave () {
      return this.status === 'save'
    }
  },
  methods: {
    handleScopeSelect (value) {
      this.scope = value

      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    handleSelect (value) {
      this[this.scope].push({
        uuid: generateKey(),
        ...value
      })

      this.isReset = false
    },
    handleChange ({ scope }, value) {
      this[scope] = [...value]
    },
    handleResetButtonClick () {
      this.artists = []
      this.albums = []
      this.tracks = []

      this.$refs.input.clear()
      this.$refs.input.focus()

      this.status = 'import'
      this.isReset = true
    },
    handleSave () {
      this.status = 'save'
    },
    show () {
      this.$refs.modal.show()
      this.$refs.input.focus()
    },
    hide () {
      this.$refs.modal.hide()
    },
    setArtists (value) {
      this.artists = value
    },
    setAlbums (value) {
      this.albums = value
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
