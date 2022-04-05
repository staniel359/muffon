<template>
  <BasePageContainer
    :responseData="profileData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :profileData="profileData"
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
import formatProfilePageNavigation
  from '*/helpers/formatters/navigation/profile'
import formatProfilePlaylistsPageTab
  from '*/helpers/formatters/tabs/profile/playlists'
import getProfilePlaylists from '*/helpers/actions/api/profile/playlists/get'

export default {
  name: 'BaseProfilePlaylistsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    limit: Number
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
        profileNickname:
          this.profileNicknameFetched,
        scope: 'playlists'
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    playlistsArgs () {
      return {
        profileId: this.profileId,
        limit: this.limit
      }
    },
    tabData () {
      return formatProfilePlaylistsPageTab(
        this.navigationData
      )
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
    getProfilePlaylists,
    fetchData (page) {
      this.getProfilePlaylists({
        ...this.playlistsArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
