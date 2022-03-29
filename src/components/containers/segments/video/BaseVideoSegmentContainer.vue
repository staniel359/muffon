<template>
  <div
    class="ui basic segments"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :headerTextKey="headerTextKey"
      :formatHeaderLink="formatHeaderLink"
      :videoId="videoId"
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
import HeaderSegment from './BaseVideoSegmentContainer/HeaderSegment.vue'
import getVideo from '*/helpers/actions/api/video/get'
import { focusOnSegment } from '*/helpers/actions/layout'

export default {
  name: 'BaseVideoSegmentContainer',
  components: {
    HeaderSegment
  },
  props: {
    videoId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
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
