<template>
  <BasePageContainer
    :response-data="playlistData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :playlist-data="playlistData"
      :playlist-title="playlistTitle"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatProfilePlaylistPageNavigation
  from '@/helpers/formatters/navigation/profile/playlist'
import formatProfilePlaylistPageTab
  from '@/helpers/formatters/tabs/profile/playlist'
import getProfilePlaylist from '@/helpers/actions/api/profile/playlist/get'

export default {
  name: 'BaseProfilePlaylistPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setPlaylistData: this.setPlaylistData
    }
  },
  props: {
    profileId: {
      type: Number,
      required: true
    },
    playlistId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatProfilePlaylistPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNickname,
        playlistId: this.playlistId,
        playlistTitle: this.playlistTitle
      }
    },
    tabData () {
      return formatProfilePlaylistPageTab(
        this.navigationData
      )
    },
    profileNickname () {
      return this.profileData?.nickname
    },
    playlistTitle () {
      return this.playlistData?.title
    },
    playlistData () {
      return this.profileData?.playlist
    },
    playlistArgs () {
      return {
        profileId: this.profileId,
        playlistId: this.playlistId
      }
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfilePlaylist,
    getData () {
      this.getProfilePlaylist(
        this.playlistArgs
      )
    },
    setPlaylistData (
      value
    ) {
      this.profileData.playlist = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
