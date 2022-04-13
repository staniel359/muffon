<template>
  <BaseModalContentContainer
    ref="modal"
    :response-data="videoData"
    :is-loading="isLoading"
    :error="error"
    @call="handleModalCall"
    @refresh="handleModalRefresh"
  >
    <template #default>
      <slot
        :[scope]="videoData[scope]"
      />
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '*/components/containers/modals/BaseModalContentContainer.vue'
import getVideo from '*/helpers/actions/api/video/get'

export default {
  name: 'BaseVideoModalContainer',
  components: {
    BaseModalContentContainer
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
    handleModalCall () {
      this.fetchData()
    },
    handleModalRefresh () {
      this.fetchData()
    },
    getVideo,
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
