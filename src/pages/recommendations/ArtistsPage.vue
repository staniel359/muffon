<template>
  <BaseRecommendationsPaginatedPageContainer
    :key="refreshKey"
    ref="page"
    model="recommendationArtist"
    :scope="scope"
    :limit="limit"
    :order="order"
    :view-id="viewId"
    :filter-args="filterArgs"
    is-with-top-segment
    is-with-order-change
    is-with-view-change
  >
    <template
      #top
    >
      <BaseFilterButton
        :is-active="isShowFilter"
        @click="handleFilterButtonClick"
      />
    </template>

    <template
      #topExtra
    >
      <FilterSection
        v-show="isShowFilter"
        class="main-bottom-section"
        :is-show="isShowFilter"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseArtistsList
        :artists="slotProps[scope]"
        :view-id="viewId"
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
        is-with-delete-option
        is-recommendation
      />
    </template>
  </BaseRecommendationsPaginatedPageContainer>
</template>

<script>
import BaseRecommendationsPaginatedPageContainer
  from '@/components/containers/pages/recommendations/BaseRecommendationsPaginatedPageContainer.vue'
import BaseFilterButton from '@/components/buttons/BaseFilterButton.vue'
import FilterSection from './ArtistsPage/FilterSection.vue'
import BaseArtistsList
  from '@/components/lists/artists/BaseArtistsList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import recommendationArtistsMixin from '@/mixins/recommendationArtistsMixin'
import {
  isObjectChanged
} from '@/helpers/utils'

export default {
  name: 'ArtistsPage',
  components: {
    BaseRecommendationsPaginatedPageContainer,
    BaseFilterButton,
    FilterSection,
    BaseArtistsList
  },
  mixins: [
    orderChangeMixin,
    pageMixin,
    viewChangeMixin,
    recommendationArtistsMixin
  ],
  provide () {
    return {
      setFilterArgs:
        this.setFilterArgs
    }
  },
  data () {
    return {
      isPage: true,
      isShowFilter: false,
      scope: 'artists',
      order:
        'libraryArtistsCountDesc',
      filterArgs: {}
    }
  },
  watch: {
    filterArgs: 'handleFilterArgsChange'
  },
  methods: {
    handleFilterButtonClick () {
      this.isShowFilter =
        !this.isShowFilter
    },
    async handleFilterArgsChange (
      value,
      oldValue
    ) {
      const isChanged =
        isObjectChanged(
          value,
          oldValue
        )

      if (isChanged) {
        await this.$nextTick()

        this.refreshPagination()
      }
    },
    setFilterArgs (
      value
    ) {
      this.filterArgs = value
    },
    refreshPagination () {
      this.$refs
        .page
        .refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
