<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <div class="info-section">
      <div
        v-text="createdText"
      />

      <strong
        v-text="createdFormatted"
      />
    </div>

    <div
      v-if="wasOnline"
      class="info-section"
    >
      <div
        v-text="wasOnlineText"
      />

      <strong
        v-text="wasOnlineFormatted"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import {
  dateTime as formatDateTime
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'BaseProfileInfoPopup',
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
    createdText () {
      return this.$t(
        'created.profile'
      )
    },
    createdFormatted () {
      return formatDateTime(
        this.created
      )
    },
    created () {
      return this.profileData.created
    },
    wasOnlineText () {
      return this.$t(
        'profile.wasOnline'
      )
    },
    wasOnlineFormatted () {
      return formatDateTime(
        this.wasOnline
      )
    },
    wasOnline () {
      return this.profileData.was_online
    }
  }
}
</script>

<style lang="sass" scoped>
.info-section
  &:not(:first-child)
    margin-top: 0.5em
</style>
