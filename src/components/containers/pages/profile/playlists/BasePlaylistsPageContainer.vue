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
import formatProfilePageNavigation from '#/formatters/navigation/profile'
import formatProfilePlaylistsPageTab from '#/formatters/tabs/profile/playlists'
import fetchProfilePlaylistsData
  from '#/actions/api/profile/playlists/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BasePlaylistsPageContainer',
  components: {
    BasePageContainer
  },
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
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
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
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatProfilePlaylistsPageTab(
          this.navigationData
        )
      )
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
