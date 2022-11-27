<template>
  <BaseRecommendationsPaginatedPageContainer
    model="recommendation"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template #top>
      <BaseFilterButton
        :is-active="isShowFilter"
        @click="handleFilterButtonClick"
      />
    </template>

    <template #topExtra>
      <FilterSection
        v-show="isShowFilter"
        class="filter-section"
        :is-show="isShowFilter"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseArtistsExtendedList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-delete-option
        is-recommendation
      />
    </template>
  </BaseRecommendationsPaginatedPageContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseRecommendationsPaginatedPageContainer
  from '@/components/containers/pages/recommendations/BaseRecommendationsPaginatedPageContainer.vue'
import BaseFilterButton from '@/components/buttons/BaseFilterButton.vue'
import FilterSection from './RecommendationsPage/FilterSection.vue'
import BaseArtistsExtendedList
  from '@/components/lists/artists/BaseArtistsExtendedList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'RecommendationsPage',
  components: {
    BaseRecommendationsPaginatedPageContainer,
    BaseFilterButton,
    FilterSection,
    BaseArtistsExtendedList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      isShowFilter: false,
      limit: 10,
      scope: 'recommendations',
      order: 'libraryArtistsCountDesc'
    }
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    )
  },
  methods: {
    handleFilterButtonClick () {
      this.isShowFilter =
        !this.isShowFilter
    }
  }
}
</script>

<style lang="sass" scoped>
.filter-section
  margin-top: 1em
</style>
