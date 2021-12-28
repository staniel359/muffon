<template>
  <BaseDropdownItem
    model="track"
    :image="imageData?.extrasmall"
    :header="trackTitle"
    :subheader="trackExtraTitle"
    :content="artistName"
    :extra="duration"
    isWithImage
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'
import { generateKey } from '#/utils'
import { artistName as formatArtistName } from '#/formatters/artist'

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
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.trackData.artists
    },
    duration () {
      return this.trackData.duration
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTrackData({
        ...this.trackData,
        uuid: generateKey()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
