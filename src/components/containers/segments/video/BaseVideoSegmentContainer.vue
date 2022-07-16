<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    class="main-transparent-segment-container"
    :scope="scope"
    :header-link="headerLink"
    :is-change-transparency="false"
    is-basic
  >
    <slot
      :video-data="videoData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '*/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getVideo from '*/helpers/actions/api/video/get'

export default {
  name: 'BaseVideoSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
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
      videoData: null,
      error: null,
      isLoading: false
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
    this.getData()
  },
  methods: {
    getVideo,
    getData (
      {
        page
      } = {}
    ) {
      this.getVideo(
        {
          ...this.videoArgs,
          page
        }
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
