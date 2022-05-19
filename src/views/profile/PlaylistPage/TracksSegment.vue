<template>
  <BasePaginatedSegmentContainer
    ref="segment"
    class="main-paginated-page-segment-container"
    :response-data="playlistData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :playlist-title="playlistTitle"
        :playlist-id="playlistId"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-playlist-track
        is-with-delete-option
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import getProfilePlaylist from '*/helpers/actions/api/profile/playlist/get'
import paginatedSegmentMixin from '*/mixins/paginatedSegmentMixin'

export default {
  name: 'TracksSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    playlistId: {
      type: String,
      required: true
    },
    playlistTitle: String
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
      limit: 50,
      scope: 'tracks'
    }
  },
  computed: {
    playlistData () {
      return this.profileData?.playlist
    },
    playlistArgs () {
      return {
        profileId: this.profileId,
        playlistId: this.playlistId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfilePlaylist,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfilePlaylist(
        {
          ...this.playlistArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
