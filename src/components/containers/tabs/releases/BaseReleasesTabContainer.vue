<template>
  <BasePaginatedTabContainer
    :response-data="releasesData"
    :scope="listScope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #default="slotProps"
    >
      <slot
        :[listScope]="slotProps[listScope]"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getReleases from '@/helpers/actions/api/releases/get'
import {
  newReleases as formatNewReleasesLink,
  upcoming as formatUpcomingReleasesLink
} from '@/helpers/formatters/links/releases'

export default {
  name: 'BaseReleasesTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    listScope: {
      type: String,
      required: true
    },
    responsePageLimit: Number
  },
  data () {
    return {
      releasesData: null
    }
  },
  computed: {
    releasesArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'new':
          return formatNewReleasesLink()
        case 'upcoming':
          return formatUpcomingReleasesLink()
        default:
          return {}
      }
    }
  },
  methods: {
    getReleases,
    getData (
      {
        page
      } = {}
    ) {
      this.getReleases(
        {
          ...this.releasesArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
