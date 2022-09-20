<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="channelData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
  >
    <slot
      :[scope]="channelData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getVideoChannel from '@/helpers/actions/api/videoChannel/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseVideoChannelModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
  props: {
    channelId: {
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
      channelData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    videoChannelArgs () {
      return {
        channelId: this.channelId,
        scope: this.scope
      }
    }
  },
  methods: {
    getVideoChannel,
    getData () {
      this.getVideoChannel(
        this.videoChannelArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
