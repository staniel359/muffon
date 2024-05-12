<template>
  <BaseReleasesPaginatedPageContainer
    :key="refreshKey"
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsList
        :albums="slotProps[listScope]"
        :view-id="viewId"
        is-with-artist-name
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseReleasesPaginatedPageContainer>
</template>

<script>
import BaseReleasesPaginatedPageContainer
  from '@/components/containers/pages/releases/BaseReleasesPaginatedPageContainer.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'UpcomingPage',
  components: {
    BaseReleasesPaginatedPageContainer,
    BaseAlbumsList
  },
  mixins: [
    viewChangeMixin,
    pageMixin
  ],
  data () {
    return {
      responsePageLimit: 20,
      scope: 'upcoming',
      listScope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
