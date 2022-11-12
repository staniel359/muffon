<template>
  <BasePaginatedSegmentContainer
    ref="segment"
    class="main-paginated-page-segment-container"
    :response-data="playlistData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    is-pagination-simple
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseVideosSimpleList
        :videos="slotProps[scope]"
        is-with-share-option
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseVideosSimpleList
  from '@/components/lists/videos/BaseVideosSimpleList.vue'
import getVideoPlaylist from '@/helpers/actions/api/videoPlaylist/get'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'VideosSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseVideosSimpleList
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    playlistId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      playlistData: null,
      error: null,
      isLoading: false,
      limit: 40,
      scope: 'videos'
    }
  },
  computed: {
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
