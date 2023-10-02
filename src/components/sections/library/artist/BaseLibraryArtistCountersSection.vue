<template>
  <div class="main-counters-section">
    <TracksCounterSection
      :artist-data="artistData"
      :profile-id="profileId"
      :is-small="isSmall"
    />

    <AlbumsCounterSection
      :artist-data="artistData"
      :profile-id="profileId"
      :is-small="isSmall"
    />
  </div>
</template>

<script>
import TracksCounterSection from
  './BaseLibraryArtistCountersSection/TracksCounterSection.vue'
import AlbumsCounterSection from
  './BaseLibraryArtistCountersSection/AlbumsCounterSection.vue'

export default {
  name: 'BaseLibraryArtistCountersSection',
  components: {
    TracksCounterSection,
    AlbumsCounterSection
  },
  props: {
    artistData: Object,
    profileId: String,
    isSmall: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
