<template>
  <div
    v-if="wasOnline"
    class="main-profile-page-info"
  >
    <small
      v-text="wasOnlineText"
    />

    <strong
      class="main-small-container"
    >
      <small
        v-text="wasOnlineFormatted"
      />
    </strong>
  </div>
</template>

<script>
import {
  date as formatDate,
  time as formatTime
} from '*/helpers/formatters'

export default {
  name: 'WasOnlineSection',
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    wasOnline () {
      return this.profileData.was_online
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
    wasOnlineTimeFormatted () {
      return formatTime(
        this.wasOnline
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
