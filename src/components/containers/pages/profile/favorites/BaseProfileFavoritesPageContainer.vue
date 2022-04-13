<template>
  <BasePageContainer
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :favorites-data="favoritesData"
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
import formatProfileFavoritesPageNavigation
  from '*/helpers/formatters/navigation/profile/favorites'
import formatProfileFavoritesPageTab
  from '*/helpers/formatters/tabs/profile/favorites'
import getProfileFavorites from '*/helpers/actions/api/profile/favorites/get'

export default {
  name: 'BaseProfileFavoritesPageContainer',
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
    scope: String,
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
      return formatProfileFavoritesPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNicknameFetched,
        scope: this.scope
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    tabData () {
      return formatProfileFavoritesPageTab(
        this.navigationData
      )
    },
    favoritesArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    favoritesData () {
      return this.profileData?.favorites
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getProfileFavorites,
    fetchData (
      page
    ) {
      this.getProfileFavorites(
        {
          ...this.favoritesArgs,
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
