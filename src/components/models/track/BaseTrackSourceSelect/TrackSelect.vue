<template>
  <BaseDropdownContainer
    class="selection scrolling track-select"
    icon="dropdown"
    :header="headerFormatted"
  >
    <TracksList :tracks="tracks" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import TracksList from './TrackSelect/TracksList.vue'

export default {
  name: 'TrackSelect',
  components: {
    BaseDropdownContainer,
    TracksList
  },
  props: {
    tracks: Array
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'shared.sources.select.track'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.track-select
  width: 240px
  margin-right: 1em
</style>
