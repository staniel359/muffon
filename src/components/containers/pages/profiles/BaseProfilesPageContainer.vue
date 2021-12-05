<template>
  <BasePageContainer
    :isShowLoader="!profilesData"
    :isLoading="isLoading"
    :isError="!profilesData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="profilesData"
      :isLoading="isLoading"
      :error="error"
      :profilesData="profilesData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfilesPageNavigation from '#/formatters/navigation/profiles'
import formatProfilesPageTab from '#/formatters/tabs/profiles'
import fetchProfilesData from '#/actions/api/profiles/fetchData'

export default {
  name: 'BaseProfilesPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    responsePageLimit: Number
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
    profilesDataArgs () {
      return {
        limit: this.responsePageLimit
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
    fetchProfilesData,
    fetchData (page) {
      this.fetchProfilesData({
        ...this.profilesDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
