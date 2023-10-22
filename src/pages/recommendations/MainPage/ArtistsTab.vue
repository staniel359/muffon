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
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :items-in-row="itemsInRow"
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
  </BaseRecommendationsTabContainer>
</template>

<script>
import BaseRecommendationsTabContainer
  from '@/components/containers/tabs/recommendations/BaseRecommendationsTabContainer.vue'
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'
import recommendationArtistsMixin from '@/mixins/recommendationArtistsMixin'

export default {
  name: 'ArtistsTab',
  components: {
    BaseRecommendationsTabContainer,
    BaseArtistsTableList
  },
  mixins: [
    tabMixin,
    recommendationArtistsMixin
  ],
  data () {
    return {
      isRecommendationsTab: true,
      limit:
        artistsLimits.table.small,
      itemsInRow: (
        artistsLimits.table.small / 2
      ),
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
