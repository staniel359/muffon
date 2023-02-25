<template>
  <BaseHistoryPaginatedPageContainer
    model="event"
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :order="order"
    :is-get-data="!!profileId"
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
        is-with-queue-option
        is-with-playlist-option
        is-with-share-option
        is-with-created
      />
    </template>
  </BaseHistoryPaginatedPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseHistoryPaginatedPageContainer
  from '@/components/containers/pages/history/BaseHistoryPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'

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
      limit: 50,
      scope: 'player',
      listScope: 'tracks',
      order: 'createdDesc'
    }
  },
  computed: {
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
