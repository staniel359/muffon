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
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfilePlaylistPageNavigation
  from '#/formatters/navigation/profile/playlist'
import formatProfilePlaylistPageTab from '#/formatters/tabs/profile/playlist'
import fetchProfilePlaylistData from '#/actions/api/profile/playlist/fetchData'

export default {
  name: 'BasePlaylistPageContainer',
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
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.fetchData()
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
