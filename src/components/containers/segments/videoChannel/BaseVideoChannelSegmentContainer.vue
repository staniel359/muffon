<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :channel-data="channelData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '*/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getVideoChannel from '*/helpers/actions/api/videoChannel/get'

export default {
  name: 'BaseVideoChannelSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    channelId: {
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
      channelData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    videoChannelArgs () {
      return {
        channelId: this.channelId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getVideoChannel,
    getData (
      {
        page
      } = {}
    ) {
      this.getVideoChannel(
        {
          ...this.videoChannelArgs,
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
