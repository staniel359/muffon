<template>
  <BaseModalContainer
    ref="modal"
    @show="handleShow"
  >
    <template
      #default="slotProps"
    >
      <div
        class="content full-height large-padded"
        :class="[
          slotProps.class
        ]"
      >
        <ImportButtonsSection
          :source="source"
        />

        <BaseDivider />

        <ImportSection
          v-if="status === 'import'"
          :source="source"
          :playlists-count="playlistsCount"
        />
        <SaveSection
          v-else-if="status === 'save'"
          :key="saveSectionKey"
          :playlists="playlists"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import ImportButtonsSection
  from './BasePlaylistsAccountImportModal/ImportButtonsSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import ImportSection
  from './BasePlaylistsAccountImportModal/ImportSection.vue'
import SaveSection
  from './BasePlaylistsAccountImportModal/SaveSection.vue'

import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BasePlaylistsAccountImportModal',
  components: {
    BaseModalContainer,
    ImportButtonsSection,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      importData: this.importData,
      save: this.save,
      retry: this.retry,
      reset: this.reset,
      hideModal: this.hide
    }
  },
  data () {
    return {
      saveSectionKey: null,
      status: null,
      source: null,
      userData: null,
      isShow: false,
      playlists: []
    }
  },
  computed: {
    playlistsCount () {
      return this.userData?.playlists_count
    }
  },
  methods: {
    handleShow () {
      this.isShow = true
    },
    importData (
      {
        userData,
        source
      } = {}
    ) {
      if (userData) {
        this.status = 'import'

        this.userData = userData

        this.source = source
      }
    },
    save (
      playlists
    ) {
      this.status = 'save'

      this.playlists = [
        ...playlists
      ]
    },
    retry (
      playlists
    ) {
      this.resetSaveSection()

      this.playlists = [
        ...playlists
      ]
    },
    resetSaveSection () {
      this.saveSectionKey = generateKey()
    },
    reset () {
      this.status = null

      this.source = null
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
