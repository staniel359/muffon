<template>
  <BasePaginatedTabContainer
    ref="tab"
    :response-data="recommendationsData"
    :scope="scope"
    :limit="limit"
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
        :[scope]="slotProps[scope]"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getRecommendations from '@/helpers/actions/api/recommendations/get'
import {
  artists as formatRecommendationsArtistsLink,
  tracks as formatRecommendationsTracksLink
} from '@/helpers/formatters/links/recommendations'

export default {
  name: 'BaseRecommendationsTabContainer',
  mixins: [
    tabContainerMixin
  ],
  data () {
    return {
      recommendationsData: null
    }
  },
  computed: {
    recommendationsArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'artists':
          return formatRecommendationsArtistsLink()
        case 'tracks':
          return formatRecommendationsTracksLink()
        default:
          return {}
      }
    }
  },
  methods: {
    getRecommendations,
    getData (
      {
        page
      } = {}
    ) {
      this.getRecommendations(
        {
          ...this.recommendationsArgs,
          page
        }
      )
    },
    refresh () {
      this.$refs
        .tab
        .refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
