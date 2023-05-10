<template>
  <BaseTrackPaginatedPageContainer
    :key="refreshKey"
    :scope="scope"
    :limit="limit"
    :source-params="sourceParams"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsList
        :albums="slotProps[scope]"
        :view-id="viewId"
        is-with-artist-name
        is-with-multiple-artist-names
        is-with-listeners-count
        is-with-source
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseTrackPaginatedPageContainer>
</template>

<script>
import BaseTrackPaginatedPageContainer
  from '@/components/containers/pages/track/BaseTrackPaginatedPageContainer.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import pageMixin from '@/mixins/pageMixin'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseTrackPaginatedPageContainer,
    BaseAlbumsList
  },
  mixins: [
    pageMixin,
    viewChangeMixin
  ],
  props: {
    trackTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      scope: 'albums'
    }
  },
  computed: {
    sourceParams () {
      return {
        source: this.sourceData,
        artistName: this.artistName,
        trackTitle: this.trackTitle
      }
    },
    sourceData () {
      const {
        query
      } = this.$route

      return {
        name: query.source,
        id: query.track_id,
        artist_id: query.artist_id
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
