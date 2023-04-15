<template>
  <BaseHistoryPaginatedPageContainer
    model="event"
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[listScope]"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-duration
        is-with-source
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-save-option
        is-with-share-option
        is-with-queue-option
        is-with-created
      />
    </template>
  </BaseHistoryPaginatedPageContainer>
</template>

<script>
import BaseHistoryPaginatedPageContainer
  from '@/components/containers/pages/history/BaseHistoryPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'PlayerPage',
  components: {
    BaseHistoryPaginatedPageContainer,
    BaseTracksSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit:
        tracksLimits.simple.large,
      scope: 'player',
      listScope: 'tracks',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
