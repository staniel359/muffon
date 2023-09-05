<template>
  <BaseDivider
    :text="headerText"
  />

  <HideLibraryTracksOption />

  <HideLibraryArtistsOption />

  <HideLibraryArtistsTracksCountOption />

  <HideListenedTracksOption />

  <HideListenedArtistsOption />
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import HideLibraryTracksOption
  from './TracksSection/HideLibraryTracksOption.vue'
import HideLibraryArtistsOption
  from './TracksSection/HideLibraryArtistsOption.vue'
import HideLibraryArtistsTracksCountOption
  from './TracksSection/HideLibraryArtistsTracksCountOption.vue'
import HideListenedTracksOption
  from './TracksSection/HideListenedTracksOption.vue'
import HideListenedArtistsOption
  from './TracksSection/HideListenedArtistsOption.vue'

export default {
  name: 'TracksSection',
  components: {
    BaseDivider,
    HideLibraryTracksOption,
    HideLibraryArtistsOption,
    HideLibraryArtistsTracksCountOption,
    HideListenedTracksOption,
    HideListenedArtistsOption
  },
  computed: {
    headerText () {
      return this.$t(
        'navigation.tracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
