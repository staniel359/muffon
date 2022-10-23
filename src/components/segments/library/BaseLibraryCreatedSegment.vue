<template>
  <BaseSegmentContainer
    v-if="created"
    class="main-profile-page-info"
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
  name: 'BaseLibraryCreatedSegment',
  components: {
    BaseSegmentContainer
  },
  props: {
    modelData: {
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
    createdDateFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.modelData.created
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
