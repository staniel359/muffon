<template>
  <BasePageContainer
    :response-data="recommendationsData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :recommendations-data="recommendationsData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import recommendationsStore from '@/stores/recommendations'
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import {
  recommendations as formatRecommendationsPageNavigation
} from '@/helpers/formatters/navigation'
import formatRecommendationsPageTab
  from '@/helpers/formatters/tabs/recommendations'
import getRecommendations from '@/helpers/actions/api/recommendations/get'

export default {
  name: 'BaseRecommendationsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setFilterScope: this.setFilterScope,
      setFilterValue: this.setFilterValue
    }
  },
  props: {
    limit: Number,
    order: String
  },
  emits: [
    'refresh'
  ],
  data () {
    return {
      recommendationsData: null,
      filterScope: null,
      filterValue: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState(
      recommendationsStore,
      {
        isRecommendationsHideLibraryArtists:
          'isHideLibraryArtists',
        isRecommendationsHideListenedArtists:
          'isHideListenedArtists',
        recommendationsTracksCount:
          'tracksCount'
      }
    ),
    navigationSections () {
      return formatRecommendationsPageNavigation()
    },
    tabData () {
      return formatRecommendationsPageTab()
    },
    recommendationsArgs () {
      return {
        limit: this.limit,
        order: this.order,
        filterScope: this.filterScope,
        filterValue: this.filterValue,
        isHideLibraryArtists:
          this.isRecommendationsHideLibraryArtists,
        isHideListenedArtists:
          this.isRecommendationsHideListenedArtists,
        tracksCount:
          this.recommendationsTracksCount
      }
    }
  },
  watch: {
    recommendationsData: 'handleNavigationDataChange',
    isRecommendationsHideLibraryArtists:
      'handleIsRecommendationsHideLibraryArtists',
    isRecommendationsHideListenedArtists:
      'handleIsRecommendationsHideListenedArtists',
    recommendationsTracksCount:
      'handleRecommendationsTracksCount',
    filterValue: 'handleFilterValueChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getRecommendations,
    handleFilterValueChange () {
      this.refresh()
    },
    handleIsRecommendationsHideLibraryArtists () {
      this.refresh()
    },
    handleIsRecommendationsHideListenedArtists () {
      this.refresh()
    },
    handleRecommendationsTracksCount () {
      this.refresh()
    },
    refresh () {
      this.$emit(
        'refresh'
      )
    },
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
    setFilterScope (
      value
    ) {
      this.filterScope = value
    },
    setFilterValue (
      value
    ) {
      this.filterValue = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
