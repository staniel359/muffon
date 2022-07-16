<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    class="main-transparent-segment-container"
    :scope="scope"
    :header-link="headerLink"
    is-basic
    :is-change-transparency="false"
  >
    <slot
      :track-data="trackData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '*/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getTrack from '*/helpers/actions/api/track/get'

export default {
  name: 'BaseTrackSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
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
      trackData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    trackArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getTrack,
    getData (
      {
        page
      } = {}
    ) {
      this.getTrack(
        {
          ...this.trackArgs,
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
