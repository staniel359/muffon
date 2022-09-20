<template>
  <Component
    :is="component"
    ref="modal"
    :key="key"
    :response-data="trackData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <slot
      :[scope]="trackData[scope]"
    />
  </Component>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getTrack from '@/helpers/actions/api/track/get'
import {
  generateKey
} from '@/helpers/utils'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseTrackModalContainer',
  components: {
    BasePaginatedSegmentModalContainer,
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
    },
    limit: Number,
    isPaginated: Boolean
  },
  data () {
    return {
      key: null,
      trackData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    component () {
      if (this.isPaginated) {
        return 'BasePaginatedSegmentModalContainer'
      } else {
        return 'BaseSegmentModalContainer'
      }
    },
    trackArgs () {
      return {
        ...this.requestTrackData,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  watch: {
    requestTrackData: 'handleRequestTrackDataChange'
  },
  methods: {
    getTrack,
    handleRequestTrackDataChange () {
      this.trackData = null

      this.key = generateKey()
    },
    getData () {
      this.getTrack(
        this.trackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
