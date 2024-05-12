<template>
  <BaseTopPaginatedPageContainer
    :key="refreshKey"
    :scope="scope"
    :limit="limit"
    :view-id="viewId"
    is-with-top-segment
    is-with-country-select
    is-with-view-change
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsList
        :view-id="viewId"
        :artists="slotProps[scope]"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseTopPaginatedPageContainer>
</template>

<script>
import BaseTopPaginatedPageContainer
  from '@/components/containers/pages/top/BaseTopPaginatedPageContainer.vue'
import BaseArtistsList from '@/components/lists/artists/BaseArtistsList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'ArtistsPage',
  components: {
    BaseTopPaginatedPageContainer,
    BaseArtistsList
  },
  mixins: [
    viewChangeMixin,
    pageMixin
  ],
  data () {
    return {
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
