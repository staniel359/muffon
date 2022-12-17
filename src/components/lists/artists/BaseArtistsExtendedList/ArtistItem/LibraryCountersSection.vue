<template>
  <div class="library-counters-container">
    <TracksCounter
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
.library-counters-container
  @extend .d-flex, .justify-content-center
  margin-top: 0.5em
</style>
