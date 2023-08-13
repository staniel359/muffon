<template>
  <BaseRecommendationsPaginatedPageContainer
    :key="refreshKey"
    model="recommendation"
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :order="order"
    :view-id="viewId"
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
        class="filter-section"
        :is-show="isShowFilter"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseArtistsList
        :artists="slotProps[scope]"
        :profile-id="profileId"
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
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseRecommendationsPaginatedPageContainer
  from '@/components/containers/pages/recommendations/BaseRecommendationsPaginatedPageContainer.vue'
import BaseFilterButton from '@/components/buttons/BaseFilterButton.vue'
import FilterSection from './MainPage/FilterSection.vue'
import BaseArtistsList
  from '@/components/lists/artists/BaseArtistsList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'MainPage',
  components: {
    BaseRecommendationsPaginatedPageContainer,
    BaseFilterButton,
    FilterSection,
    BaseArtistsList
  },
  mixins: [
    orderChangeMixin,
    pageMixin,
    viewChangeMixin
  ],
  data () {
    return {
      isShowFilter: false,
      scope: 'recommendations',
      listScope: 'artists',
      order: 'libraryArtistsCountDesc'
    }
  },
  computed: {
    ...mapState(
      profileStore,
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
