<template>
  <div>
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
  </div>
</template>

<script>
import {
  date as formatDate,
  time as formatTime
} from '@/helpers/formatters'

export default {
  name: 'BaseProfileInfoPopup',
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
      return [
        this.createdDateFormatted,
        this.createdTimeFormatted
      ].join(
        ' '
      )
    },
    createdDateFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.profileData.created
    },
    createdTimeFormatted () {
      return formatTime(
        this.created
      )
    },
    wasOnlineText () {
      return this.$t(
        'profile.wasOnline'
      )
    },
    wasOnlineFormatted () {
      return [
        this.wasOnlineDateFormatted,
        this.wasOnlineTimeFormatted
      ].join(
        ' '
      )
    },
    wasOnlineDateFormatted () {
      return formatDate(
        this.wasOnline
      )
    },
    wasOnline () {
      return this.profileData.was_online
    },
    wasOnlineTimeFormatted () {
      return formatTime(
        this.wasOnline
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.info-section
  &:not(:first-child)
    margin-top: 0.5em
</style>
