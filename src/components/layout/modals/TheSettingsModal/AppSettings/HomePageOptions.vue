<template>
  <div class="main-settings-options-block">
    <OptionItem
      action-key="isWithRecentTracksSegment"
      text-key="listenedRecently"
      :is-checked="isHomePageWithRecentTracksSegment"
    />

    <OptionItem
      v-if="profileId"
      action-key="isWithRecommendationArtistsSegment"
      text-key="recommendationsCollection.artists"
      :is-checked="isHomePageWithRecommendationArtistsSegment"
    />

    <OptionItem
      v-if="profileId"
      action-key="isWithRecommendationTracksSegment"
      text-key="recommendationsCollection.tracks"
      :is-checked="isHomePageWithRecommendationTracksSegment"
    />

    <OptionItem
      action-key="isWithTopArtistsSegment"
      text-key="topCollection.artists"
      :is-checked="isHomePageWithTopArtistsSegment"
    />

    <OptionItem
      action-key="isWithTopAlbumsSegment"
      text-key="topCollection.albums"
      :is-checked="isHomePageWithTopAlbumsSegment"
    />

    <OptionItem
      action-key="isWithTopTracksSegment"
      text-key="topCollection.tracks"
      :is-checked="isHomePageWithTopTracksSegment"
    />

    <OptionItem
      action-key="isWithNewReleasesSegment"
      text-key="releasesCollection.new"
      :is-checked="isHomePageWithNewReleasesSegment"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import homePageStore from '@/stores/homePage'
import profileStore from '@/stores/profile'
import OptionItem from './HomePageOptions/OptionItem.vue'

export default {
  name: 'HomePageOptions',
  components: {
    OptionItem
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

<style lang="sass" scoped></style>
