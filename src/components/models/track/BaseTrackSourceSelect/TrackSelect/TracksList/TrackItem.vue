<template>
  <BaseDropdownItem
    :image="image"
    :header="trackTitle"
    :subheader="trackExtraTitle"
    :content="artistName"
    :extra="duration"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/BaseDropdownItem.vue'
import { generateKey } from '#/utils'

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
    image () {
      return this.trackData.image?.extrasmall
    },
    trackTitle () {
      return this.trackData.title
    },
    trackExtraTitle () {
      return this.trackData.extra_title
    },
    artistName () {
      return this.trackData.artist?.name
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
