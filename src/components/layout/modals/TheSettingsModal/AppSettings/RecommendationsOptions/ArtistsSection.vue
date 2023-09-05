<template>
  <BaseDivider
    :text="headerText"
  />

  <HideLibraryArtistsOption />

  <HideLibraryArtistsTracksCountOption />

  <HideListenedArtistsOption />
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import HideLibraryArtistsOption
  from './ArtistsSection/HideLibraryArtistsOption.vue'
import HideLibraryArtistsTracksCountOption
  from './ArtistsSection/HideLibraryArtistsTracksCountOption.vue'
import HideListenedArtistsOption
  from './ArtistsSection/HideListenedArtistsOption.vue'

export default {
  name: 'ArtistsSection',
  components: {
    BaseDivider,
    HideLibraryArtistsOption,
    HideLibraryArtistsTracksCountOption,
    HideListenedArtistsOption
  },
  computed: {
    headerText () {
      return this.$t(
        'navigation.artists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
