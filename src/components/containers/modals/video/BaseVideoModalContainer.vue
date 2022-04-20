<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="videoData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <slot
      :[scope]="videoData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '*/components/containers/modals/BaseSegmentModalContainer.vue'
import getVideo from '*/helpers/actions/api/video/get'

export default {
  name: 'BaseVideoModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  props: {
    videoId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      videoData: null,
      isLoading: false
    }
  },
  computed: {
    videoArgs () {
      return {
        videoId: this.videoId,
        scope: this.scope
      }
    }
  },
  methods: {
    getVideo,
    handleCall () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    fetchData () {
      this.getVideo(
        this.videoArgs
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
