<template>
  <BaseSegmentContainer
    v-if="created"
  >
    <div
      v-text="sinceText"
    />

    <strong
      v-text="createdDateFormatted"
    />

    <strong
      v-text="createdTimeFormatted"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import {
  date as formatDate,
  time as formatTime
} from '@/helpers/formatters'

export default {
  name: 'BaseSinceSegment',
  components: {
    BaseSegmentContainer
  },
  props: {
    modelData: {
      type: Object,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  computed: {
    created () {
      return this.modelData.created
    },
    sinceText () {
      return this.$t(
        `${this.model}.since`
      )
    },
    createdDateFormatted () {
      return formatDate(
        this.created
      )
    },
    createdTimeFormatted () {
      return formatTime(
        this.created
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
