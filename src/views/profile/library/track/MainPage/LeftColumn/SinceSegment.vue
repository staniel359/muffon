<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <div
      v-text="sinceText"
    />

    <strong
      v-text="createdFormatted"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import {
  date as formatDate
} from '@/helpers/formatters'

export default {
  name: 'SinceSegment',
  components: {
    BaseSegmentContainer
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    sinceText () {
      return this.$t(
        'library.since'
      )
    },
    createdFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.trackData.created
    }
  }
}
</script>

<style lang="sass" scoped></style>
