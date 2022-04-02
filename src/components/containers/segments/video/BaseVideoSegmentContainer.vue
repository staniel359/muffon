<template>
  <div
    class="ui basic segments"
    ref="segment"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :videoData="videoData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getVideo from '*/helpers/actions/api/video/get'
import { focusOnSegment } from '*/helpers/actions/layout'

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
    responsePageLimit: Number,
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
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getVideo,
    fetchData (page) {
      this.getVideo({
        ...this.videoArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(
          this.$refs.segment
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
