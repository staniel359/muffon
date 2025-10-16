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
    is-pagination-simple
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseVideosList
        :videos="slotProps[scope]"
        :view-id="viewId"
        is-with-channel-title
        is-with-favorite-option
        is-with-bookmark-option
        is-with-watched-option
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
import BaseVideosList from '@/components/lists/videos/BaseVideosList.vue'
import getVideoPlaylist from '@/helpers/actions/api/videoPlaylist/get'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'VideosSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseVideosList
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    playlistId: {
      type: String,
      required: true
    },
    scope: String,
    viewId: String,
    limit: Number
  },
  data () {
    return {
      playlistData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithInfiniteScroll'
      ]
    ),
    playlistArgs () {
      return {
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
    getVideoPlaylist,
    getData (
      {
        page
      } = {}
    ) {
      this.getVideoPlaylist(
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
