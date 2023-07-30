<template>
  <div class="description main-counters-section">
    <TracksCounter
      class="tracks-link"
      :artist-data="artistData"
      :profile-id="profileId"
    />

    <AlbumsCounter
      :artist-data="artistData"
      :profile-id="profileId"
    />
  </div>
</template>

<script>
import TracksCounter from './LibraryCountersSection/TracksCounter.vue'
import AlbumsCounter from './LibraryCountersSection/AlbumsCounter.vue'

export default {
  name: 'LibraryCountersSection',
  components: {
    TracksCounter,
    AlbumsCounter
  },
  props: {
    artistData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped>
.tracks-link
  margin-right: 0.75em
</style>
