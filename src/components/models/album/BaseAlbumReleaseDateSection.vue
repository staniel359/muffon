<template>
  <small
    v-if="releaseDate"
    v-text="releaseDateFormatted"
  />
</template>

<script>
import {
  date as formatDate
} from '@/helpers/formatters'

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
