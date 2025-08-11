<template>
  <BasePaginatedSegmentContainer
    ref="segment"
    class="main-paginated-page-segment-container"
    :response-data="playlistData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    :is-with-infinite-scroll="isWithInfiniteScroll"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :playlist-title="playlistTitle"
        :playlist-id="playlistId"
        :profile-id="profileId"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-source
        is-with-created
        is-playlist-track
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-queue-option
        is-with-save-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import getProfilePlaylist from '@/helpers/actions/api/profile/playlist/get'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

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
      type: Number,
      required: true
    },
    playlistId: {
      type: Number,
      required: true
    },
    playlistTitle: String,
    order: String
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
      limit:
        tracksLimits.simple.large,
      scope: 'tracks'
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithInfiniteScroll'
      ]
    ),
    playlistData () {
      return this.profileData?.playlist
    },
    playlistArgs () {
      return {
        profileId: this.profileId,
        playlistId: this.playlistId,
        scope: this.scope,
        limit: this.limit,
        order: this.order
      }
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
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
