<template>
  <BaseSegmentModalContainer
    ref="modal"
    :is-loading="isLoading"
    :error="error"
    :response-data="trackData"
    @call="handleCall"
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
import modalMixin from '*/mixins/modalMixin'

export default {
  name: 'BaseTrackModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
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
      trackData: null,
      error: null,
      isLoading: false
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
    getData () {
      this.getTrack(
        this.trackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
