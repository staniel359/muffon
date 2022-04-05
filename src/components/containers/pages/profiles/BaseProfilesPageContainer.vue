<template>
  <BasePageContainer
    :responseData="profilesData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :profilesData="profilesData"
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
import {
  profiles as formatProfilesPageNavigation
} from '*/helpers/formatters/navigation'
import formatProfilesPageTab from '*/helpers/formatters/tabs/profiles'
import getProfiles from '*/helpers/actions/api/profiles/get'

export default {
  name: 'BaseProfilesPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    limit: Number
  },
  data () {
    return {
      error: null,
      profilesData: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatProfilesPageNavigation()
    },
    tabData () {
      return formatProfilesPageTab()
    },
    profilesArgs () {
      return {
        limit: this.limit
      }
    }
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getProfiles,
    fetchData (page) {
      this.getProfiles({
        ...this.profilesArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
