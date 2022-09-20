<template>
  <BaseDropdownContainer
    class="main-source-select-item-select"
    :header="headerText"
  >
    <TracksList
      :tracks="tracks"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/BaseDropdownContainer.vue'
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
    headerText () {
      return this.$t(
        'select.track'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
