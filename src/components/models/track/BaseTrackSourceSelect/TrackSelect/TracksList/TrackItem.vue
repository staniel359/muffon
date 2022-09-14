<template>
  <BaseDropdownItem
    model="track"
    :image="imageData?.extrasmall"
    :header="trackTitle"
    :subheader="trackExtraTitle"
    :content="artistName"
    :extra="durationFormatted"
    is-with-image
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '*/components/dropdowns/BaseDropdownItem.vue'
import {
  generateKey
} from '*/helpers/utils'
import {
  seconds as formatSeconds
} from '*/helpers/formatters'

export default {
  name: 'TrackItem',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedTrackData'
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
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
      return this.trackData.duration_seconds
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTrackData(
        {
          ...this.trackData,
          uuid: generateKey()
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
