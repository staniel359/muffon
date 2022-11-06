<template>
  <BaseDropdownItem
    model="track"
    :value="uuid"
    :image="imageData?.extrasmall"
    :header="trackTitle"
    :subheader="trackExtraTitle"
    :content="artistName"
    :extra="durationFormatted"
    is-with-image
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'
import {
  seconds as formatSeconds
} from '@/helpers/formatters'

export default {
  name: 'TrackItem',
  components: {
    BaseDropdownItem
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    uuid () {
      return this.trackData.uuid
    },
    imageData () {
      return this.trackData.image
    },
    trackTitle () {
      return this.trackData.title
    },
    trackExtraTitle () {
      return this.trackData.extra_title
    },
    artistName () {
      return this.trackData.artist.name
    },
    durationFormatted () {
      if (this.duration) {
        return formatSeconds(
          this.duration
        )
      } else {
        return null
      }
    },
    duration () {
      return this.trackData.duration
    }
  }
}
</script>

<style lang="sass" scoped></style>
