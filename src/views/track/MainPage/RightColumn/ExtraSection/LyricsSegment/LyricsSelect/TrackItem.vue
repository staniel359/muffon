<template>
  <BaseDropdownItem
    :value="uuid"
    :header="trackTitle"
    :content="artistName"
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

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
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
