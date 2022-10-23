<template>
  <div class="playing-info-block">
    <TitleSection
      :track-data="trackData"
    />

    <ArtistsSection
      :track-data="trackData"
    />

    <AlbumSection
      :track-data="trackData"
    />
  </div>
</template>

<script>
import TitleSection from './InfoBlock/TitleSection.vue'
import ArtistsSection from './InfoBlock/ArtistsSection.vue'
import AlbumSection from './InfoBlock/AlbumSection.vue'

export default {
  name: 'InfoBlock',
  components: {
    TitleSection,
    ArtistsSection,
    AlbumSection
  },
  props: {
    trackData: Object
  }
}
</script>

<style lang="sass" scoped>
.playing-info-block
  @extend .absolute, .w-100, .background-black-transparent
  z-index: 1,
  padding: 1em 2em
  bottom: 0
</style>
