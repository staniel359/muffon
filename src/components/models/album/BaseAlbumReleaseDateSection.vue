<template>
  <div
    v-if="releaseDate"
    class="main-release-date-section"
  >
    <small
      v-text="releaseDateFormatted"
    />
  </div>
</template>

<script>
import {
  date as formatDate
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'BaseAlbumReleaseDateSection',
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    releaseDateFormatted () {
      return formatDate(
        this.releaseDate
      )
    },
    releaseDate () {
      return this.albumData.release_date
    }
  }
}
</script>

<style lang="sass" scoped></style>
