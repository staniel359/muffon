<template>
  <BaseDropdownContainer
    class="basic pointing scrolling button track-select"
    :header="headerFormatted"
  >
    <TracksList :tracks="tracks" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import TracksList from './TrackSelect/TracksList.vue'
import { localize } from '#/actions/plugins/i18n'

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
      return localize(
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
