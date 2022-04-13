<template>
  <div
    ref="segment"
    class="ui basic segments"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :video-data="videoData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getVideo from '*/helpers/actions/api/video/get'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'BaseVideoSegmentContainer',
  components: {
    BaseHeaderSegment
  },
  props: {
    videoId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      isLoading: false,
      error: null,
      videoData: null
    }
  },
  computed: {
    videoArgs () {
      return {
        videoId: this.videoId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getVideo,
    fetchData (
      page
    ) {
      this.getVideo(
        {
          ...this.videoArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
