<template>
  <BaseSegmentModalContainer
    ref="modal"
    :is-loading="isLoading"
    :error="error"
    :response-data="trackData"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <slot
      :[scope]="trackData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '*/components/containers/modals/BaseSegmentModalContainer.vue'
import getTrack from '*/helpers/actions/api/track/get'

export default {
  name: 'BaseTrackModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  props: {
    requestTrackData: {
      type: Object,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      error: null,
      trackData: null
    }
  },
  computed: {
    trackArgs () {
      return {
        ...this.requestTrackData,
        scope: this.scope
      }
    }
  },
  methods: {
    getTrack,
    handleCall () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    fetchData () {
      this.getTrack(
        this.trackArgs
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
