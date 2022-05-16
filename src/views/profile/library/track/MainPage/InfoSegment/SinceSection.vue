<template>
  <div class="main-profile-page-info">
    <div
      v-text="sinceText"
    />

    <strong
      v-text="createdFormatted"
    />
  </div>
</template>

<script>
import {
  date as formatDate
} from '*/helpers/formatters'

export default {
  name: 'SinceSection',
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
