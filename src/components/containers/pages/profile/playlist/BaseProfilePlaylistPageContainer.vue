<template>
  <BasePageContainer
    :responseData="playlistData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :playlistData="playlistData"
      :playlistTitle="playlistTitleFetched"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfilePlaylistPageNavigation
  from '*/helpers/formatters/navigation/profile/playlist'
import formatProfilePlaylistPageTab
  from '*/helpers/formatters/tabs/profile/playlist'
import getProfilePlaylist from '*/helpers/actions/api/profile/playlist/get'

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
      setProfileData: this.setProfileData
    }
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    playlistId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      profileData: null,
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
        profileNickname: this.profileNicknameFetched,
        playlistId: this.playlistId,
        playlistTitle: this.playlistTitleFetched
      }
    },
    tabData () {
      return formatProfilePlaylistPageTab(
        this.navigationData
      )
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    playlistTitleFetched () {
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
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.fetchData()
    },
    getProfilePlaylist,
    fetchData () {
      this.getProfilePlaylist(
        this.playlistArgs
      )
    },
    setProfileData (value) {
      this.profileData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
