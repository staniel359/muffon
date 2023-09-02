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
import {
  isObjectChanged
} from '@/helpers/utils'

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
      setFilterArgs:
        this.setFilterArgs
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    order: String
  },
  emits: [
    'refresh'
  ],
  data () {
    return {
      recommendationsData: null,
      error: null,
      isLoading: false,
      filterArgs: {}
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
        scope: this.scope,
        limit: this.limit,
        order: this.order,
        ...this.filterArgs
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
      'handleRecommendationsTracksCountChange',
    filterArgs: 'handleFilterArgsChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getRecommendations,
    handleIsRecommendationsHideLibraryArtists () {
      this.refresh()
    },
    handleIsRecommendationsHideListenedArtists () {
      this.refresh()
    },
    handleRecommendationsTracksCountChange () {
      this.refresh()
    },
    handleFilterArgsChange (
      value,
      oldValue
    ) {
      const isChanged =
        isObjectChanged(
          value,
          oldValue
        )

      if (isChanged) {
        this.refresh()
      }
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
    setFilterArgs (
      value
    ) {
      this.filterArgs = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
