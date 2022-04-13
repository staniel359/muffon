<template>
  <BasePageContainer
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :profile-data="profileData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
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
import getProfilePlaylists from '*/helpers/actions/api/profile/get'

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
      isLoading: false,
      scope: 'playlists'
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
        scope: this.scope
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    playlistsArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
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
    getProfilePlaylists,
    fetchData (
      page
    ) {
      this.getProfilePlaylists(
        {
          ...this.playlistsArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
