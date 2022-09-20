<template>
  <BaseTopPaginatedPageContainer
    :scope="scope"
    :limit="limit"
    is-with-top-segment
    is-with-country-select
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-artist-image
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
      />
    </template>
  </BaseTopPaginatedPageContainer>
</template>

<script>
import BaseTopPaginatedPageContainer
  from '@/components/containers/pages/top/BaseTopPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BaseTopPaginatedPageContainer,
    BaseTracksSimpleList
  },
  data () {
    return {
      limit: 50,
      scope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>
