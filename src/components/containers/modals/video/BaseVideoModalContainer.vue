<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="videoData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
  >
    <slot
      :[scope]="videoData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getVideo from '@/helpers/actions/api/video/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseVideoModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
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
      videoData: null,
      error: null,
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
    getData () {
      this.getVideo(
        this.videoArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
