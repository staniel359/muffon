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
      :favoritesData="favoritesData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
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
        limit: this.responsePageLimit
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
    handleRefresh (page) {
      this.fetchData(page)
    },
    getProfileFavorites,
    fetchData (page) {
      this.getProfileFavorites({
        ...this.favoritesArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
