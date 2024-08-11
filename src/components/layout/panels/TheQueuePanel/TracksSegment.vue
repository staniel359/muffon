<template>
  <BaseSegmentContainer
    ref="segment"
    class="overflow-y-auto flex-full scroll-smooth"
  >
    <TracksList
      v-if="scrollable"
      :key="key"
      :scrollable="scrollable"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import TracksList from './TracksSegment/TracksList.vue'
import {
  generateKey,
  isObjectChanged
} from '@/helpers/utils'
import scrollMixin from '@/mixins/scrollMixin'

export default {
  name: 'TracksSegment',
  components: {
    BaseSegmentContainer,
    TracksList
  },
  mixins: [
    scrollMixin
  ],
  data () {
    return {
      key: null,
      scrollable: null
    }
  },
  computed: {
    ...mapState(
      queueStore,
      {
        queueTracksComputed: 'tracksComputed'
      }
    )
  },
  watch: {
    queueTracksComputed:
      'handleQueueTracksComputedChange'
  },
  mounted () {
    this.scrollable =
      this.$refs.segment.$el
  },
  methods: {
    handleQueueTracksComputedChange (
      value,
      oldValue
    ) {
      const isChanged =
        isObjectChanged(
          value,
          oldValue
        )

      if (isChanged) {
        this.key = generateKey()

        this.scrollToTop()
      }
    },
    scrollToTop () {
      this.$refs
        .segment
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
