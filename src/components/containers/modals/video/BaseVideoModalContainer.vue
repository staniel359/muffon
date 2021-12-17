<template>
  <BaseModalContentContainer
    ref="modal"
    :isLoading="isLoading"
    :error="error"
    :responseData="videoData"
    @call="handleModalCall"
    @refresh="handleModalRefresh"
  >
    <template #default>
      <slot :[scope]="videoData[scope]"></slot>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '@/containers/modals/BaseModalContentContainer.vue'
import getVideo from '#/actions/api/video/get'

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
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
