<template>
  <div>
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
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'

import BaseImportConnectSection
  from '@/components/sections/import/BaseImportConnectSection.vue'

export default {
  name: 'ImportButtonsSection',
  components: {
    BaseImportConnectSection
  },
  props: {
    source: String
  },
  data () {
    return {
      scope: 'playlists'
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    isRenderLastfmConnectSection () {
      return (
        !!this.lastfmConnection && (
          !this.source || (
            this.source === 'lastfm'
          )
        )
      )
    },
    lastfmConnection () {
      return this.profileConnections?.lastfm
    },
    isRenderSpotifyConnectSection () {
      return (
        !!this.spotifyConnection && (
          !this.source || (
            this.source === 'spotify'
          )
        )
      )
    },
    spotifyConnection () {
      return this.profileConnections?.spotify
    }
  }
}
</script>

<style lang="sass" scoped></style>
