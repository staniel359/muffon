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
        <BaseImportConnectSection
          v-if="isRenderLastfmConnectSection"
          source="lastfm"
          :scope="scope"
        />

        <BaseImportConnectSection
          v-if="isRenderSpotifyConnectSection"
          source="spotify"
          :scope="scope"
        />

        <BaseDivider />

        <ImportSection
          v-if="isImport"
          :source="source"
          :scope="scope"
          :limit="limit"
          :total-count="totalCount"
        />
        <SaveSection
          v-if="isSave"
          :key="saveSectionKey"
          :playlists="playlists"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BaseImportConnectSection
  from '@/components/sections/import/BaseImportConnectSection.vue'
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
    BaseImportConnectSection,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      import: this.import,
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
      playlists: [],
      scope: 'playlists',
      limit: 1
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    isImport () {
      return (
        this.status === 'import'
      )
    },
    isSave () {
      return (
        this.status === 'save'
      )
    },
    totalCount () {
      return this.userData?.[
        `${this.scope}_count`
      ]
    },
    isRenderLastfmConnectSection () {
      return (
        !!this.lastfmConnection && (
          !this.source ||
            this.isLastfmSource
        )
      )
    },
    lastfmConnection () {
      return this.profileConnections.lastfm
    },
    isLastfmSource () {
      return (
        this.source === 'lastfm'
      )
    },
    isRenderSpotifyConnectSection () {
      return (
        !!this.spotifyConnection && (
          !this.source ||
            this.isSpotifySource
        )
      )
    },
    spotifyConnection () {
      return this.profileConnections.spotify
    },
    isSpotifySource () {
      return (
        this.source === 'spotify'
      )
    }
  },
  methods: {
    handleShow () {
      this.isShow = true
    },
    import (
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
      value
    ) {
      this.status = 'save'

      this.playlists = [
        ...value
      ]
    },
    retry (
      value
    ) {
      this.resetSaveSection()

      this.playlists = [
        ...value
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
