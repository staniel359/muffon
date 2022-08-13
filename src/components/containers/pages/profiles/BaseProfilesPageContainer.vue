<template>
  <BasePageContainer
    :response-data="profilesData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :profiles-data="profilesData"
      :is-loading="isLoading"
      :error="error"
    />
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
      profilesData: null,
      error: null,
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
  watch: {
    profilesData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfiles,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfiles(
        {
          ...this.profilesArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
