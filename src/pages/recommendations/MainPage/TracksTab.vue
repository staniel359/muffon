<template>
  <BaseRecommendationsTabContainer
    ref="tab"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-image
        is-with-artist-name
        is-with-album-title
        is-recommendation
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-listened-option
        is-with-playlist-option
        is-with-queue-option
        is-with-save-option
        is-with-share-option
        is-with-external-link-option
        is-with-delete-option
      />
    </template>
  </BaseRecommendationsTabContainer>
</template>

<script>
import BaseRecommendationsTabContainer
  from '@/components/containers/tabs/recommendations/BaseRecommendationsTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'
import recommendationTracksMixin from '@/mixins/recommendationTracksMixin'

export default {
  name: 'TracksTab',
  components: {
    BaseRecommendationsTabContainer,
    BaseTracksSimpleList
  },
  mixins: [
    tabMixin,
    recommendationTracksMixin
  ],
  data () {
    return {
      isRecommendationsTab: true,
      limit:
        tracksLimits.simple.small,
      scope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>
