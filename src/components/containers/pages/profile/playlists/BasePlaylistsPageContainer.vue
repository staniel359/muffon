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
import formatProfilePageNavigation from '#/formatters/navigation/profile'
import formatProfilePlaylistsPageTab from '#/formatters/tabs/profile/playlists'
import fetchProfilePlaylistsData
  from '#/actions/api/profile/playlists/fetchData'

export default {
  name: 'BasePlaylistsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    profileId: String,
    responsePageLimit: Number
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
      return formatProfilePageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNicknameFetched,
        pageNameKey: 'playlists'
      }
    },
    tabData () {
      return formatProfilePlaylistsPageTab(
        this.navigationData
      )
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    playlistsDataArgs () {
      return {
        profileId: this.profileId,
        limit: this.responsePageLimit
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
    handleRefresh (page) {
      this.fetchData(page)
    },
    fetchProfilePlaylistsData,
    fetchData (page) {
      this.fetchProfilePlaylistsData({
        ...this.playlistsDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
