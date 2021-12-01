<template>
  <BasePageContainer
    :isShowLoader="!profileData"
    :isLoading="isLoading"
    :isError="!profileData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="profileData"
      :isLoading="isLoading"
      :error="error"
      :profileData="profileData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatProfilePlaylistPageNavigation
  from '#/formatters/navigation/profile/playlist'
import formatProfilePlaylistPageTab
  from '#/formatters/tabs/profile/playlists/playlist'
import fetchProfilePlaylistData
  from '#/actions/api/profile/playlists/playlist/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BasePlaylistPageContainer',
  components: {
    BasePageContainer
  },
  provide () {
    return {
      setProfileData: this.setProfileData
    }
  },
  props: {
    profileId: String,
    playlistId: String
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
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
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    playlistTitleFetched () {
      return this.profileData?.playlist?.title
    },
    playlistDataArgs () {
      return {
        profileId: this.profileId,
        playlistId: this.playlistId
      }
    }
  },
  watch: {
    profileData: 'handleProfileDataChange',
    profileLanguage: 'handleProfileLanguageChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleProfileDataChange () {
      this.setNavigation()
    },
    handleRefresh () {
      this.fetchData()
    },
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatProfilePlaylistPageTab(
          this.navigationData
        )
      )
    },
    fetchProfilePlaylistData,
    fetchData () {
      this.fetchProfilePlaylistData(
        this.playlistDataArgs
      )
    },
    setProfileData (value) {
      this.profileData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
