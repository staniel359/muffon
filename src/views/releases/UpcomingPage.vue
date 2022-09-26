<template>
  <BaseReleasesPaginatedPageContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :view-index="viewIndex"
    is-with-top-segment
    is-with-view-change
  >
    <template #default="slotProps">
      <BaseAlbumsList
        :albums="slotProps[listScope]"
        :view-index="viewIndex"
        is-with-artist-name
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseReleasesPaginatedPageContainer>
</template>

<script>
import BaseReleasesPaginatedPageContainer
  from '@/components/containers/pages/releases/BaseReleasesPaginatedPageContainer.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'UpcomingPage',
  components: {
    BaseReleasesPaginatedPageContainer,
    BaseAlbumsList
  },
  mixins: [
    viewChangeMixin
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
