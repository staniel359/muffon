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
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    sinceText () {
      return this.$t(
        'profile.since'
      )
    },
    createdFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.profileData.created
    }
  }
}
</script>

<style lang="sass" scoped></style>
