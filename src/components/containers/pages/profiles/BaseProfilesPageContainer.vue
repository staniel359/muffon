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
import { mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatProfilesPageNavigation from '#/formatters/navigation/profiles'
import formatProfilesPageTab from '#/formatters/tabs/profiles'
import fetchProfilesData from '#/actions/api/profiles/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseProfilesPageContainer',
  components: {
    BasePageContainer
  },
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
    profilesDataArgs () {
      return {
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.setNavigationSections(
      this.navigationSections
    )

    updateTab(
      formatProfilesPageTab()
    )

    this.fetchData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleRefresh (page) {
      this.error = null

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
