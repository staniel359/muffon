<template>
  <BaseDropdownItem
    :data-value="index"
    :header="trackTitle"
    :content="artistName"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'
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
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
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
