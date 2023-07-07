<template>
  <BaseModalContainer
    ref="modal"
    @show="handleShow"
  >
    <div class="content full-height">
      <BaseImportConnectSection
        v-if="isRenderLastfmConnectSection"
        source="lastfm"
        :is-with-info="isShow"
      />

      <BaseImportConnectSection
        v-if="isRenderSpotifyConnectSection"
        source="spotify"
      />

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :source="source"
        :scope="scope"
        :limit="limit"
        :total-count="totalCount"
      />
      <BaseLibrarySaveSection
        v-if="isSave"
        scope="tracks"
        :collection="tracks"
      />
    </div>
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
import ImportSection from './BaseLibraryAccountImportModal/ImportSection.vue'
import BaseLibrarySaveSection
  from '@/components/save/library/BaseLibrarySaveSection.vue'

export default {
  name: 'BaseLibraryAccountImportModal',
  components: {
    BaseModalContainer,
    BaseImportConnectSection,
    BaseDivider,
    ImportSection,
    BaseLibrarySaveSection
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
      status: null,
      source: null,
      userData: null,
      isShow: false,
      tracks: [],
      scopesData: {
        lastfm: 'plays',
        spotify: 'tracks'
      },
      limitsData: {
        lastfm: 500,
        spotify: 50
      }
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
    scope () {
      return this.scopesData[
        this.source
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
    },
    limit () {
      return this.limitsData[
        this.source
      ]
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

      this.tracks = [
        ...value
      ]
    },
    retry (
      value
    ) {
      this.tracks = [
        ...value
      ]
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
