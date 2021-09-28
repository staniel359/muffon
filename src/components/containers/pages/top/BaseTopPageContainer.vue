<template>
  <BasePageContainer>
    <slot
      :isLoading="isLoading"
      :error="error"
      :topData="topData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatTopPageNavigation from '#/formatters/navigation/top'
import formatTopPageTab from '#/formatters/tabs/top'
import fetchTopData from '#/actions/api/top/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseTopPageContainer',
  components: {
    BasePageContainer
  },
  props: {
    scope: String,
    responsePageLimit: Number,
    pageNameKey: String
  },
  data () {
    return {
      isLoading: false,
      error: null,
      topData: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
    navigationSections () {
      return formatTopPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        pageNameKey: this.scope
      }
    },
    topDataArgs () {
      return {
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    profileLanguage: {
      immediate: true,
      handler: 'handleProfileLanguageChange'
    }
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatTopPageTab(
          this.navigationData
        )
      )
    },
    fetchTopData,
    fetchData (page) {
      this.fetchTopData({
        ...this.topDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
