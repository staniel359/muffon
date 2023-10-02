<template>
  <div class="content-section">
    <ActionsSegment />

    <RecentTracksSegment
      v-if="isHomePageWithRecentTracksSegment"
    />

    <template
      v-if="profileId"
    >
      <RecommendationArtistsSegment
        v-if="isHomePageWithRecommendationArtistsSegment"
      />

      <RecommendationTracksSegment
        v-if="isHomePageWithRecommendationTracksSegment"
      />
    </template>

    <TopArtistsSegment
      v-if="isHomePageWithTopArtistsSegment"
    />

    <TopAlbumsSegment
      v-if="isHomePageWithTopAlbumsSegment"
    />

    <TopTracksSegment
      v-if="isHomePageWithTopTracksSegment"
    />

    <NewReleasesSegment
      v-if="isHomePageWithNewReleasesSegment"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import homePageStore from '@/stores/homePage'
import profileStore from '@/stores/profile'
import ActionsSegment from './ContentSection/ActionsSegment.vue'
import RecentTracksSegment from './ContentSection/RecentTracksSegment.vue'
import RecommendationArtistsSegment
  from './ContentSection/RecommendationArtistsSegment.vue'
import RecommendationTracksSegment
  from './ContentSection/RecommendationTracksSegment.vue'
import TopArtistsSegment from './ContentSection/TopArtistsSegment.vue'
import TopAlbumsSegment from './ContentSection/TopAlbumsSegment.vue'
import TopTracksSegment from './ContentSection/TopTracksSegment.vue'
import NewReleasesSegment from './ContentSection/NewReleasesSegment.vue'

export default {
  name: 'ContentSection',
  components: {
    ActionsSegment,
    RecentTracksSegment,
    RecommendationArtistsSegment,
    RecommendationTracksSegment,
    TopArtistsSegment,
    TopAlbumsSegment,
    TopTracksSegment,
    NewReleasesSegment
  },
  computed: {
    ...mapState(
      homePageStore,
      {
        isHomePageWithRecentTracksSegment:
          'isWithRecentTracksSegment',
        isHomePageWithRecommendationArtistsSegment:
          'isWithRecommendationArtistsSegment',
        isHomePageWithRecommendationTracksSegment:
          'isWithRecommendationTracksSegment',
        isHomePageWithTopArtistsSegment:
          'isWithTopArtistsSegment',
        isHomePageWithTopAlbumsSegment:
          'isWithTopAlbumsSegment',
        isHomePageWithTopTracksSegment:
          'isWithTopTracksSegment',
        isHomePageWithNewReleasesSegment:
          'isWithNewReleasesSegment'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped>
.content-section
  margin-top: 3.5rem
</style>
