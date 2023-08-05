<template>
  <div class="description main-counters-section">
    <div class="counter-section">
      <TracksCounter
        :artist-data="artistData"
        :profile-id="profileId"
      />
    </div>

    <div class="counter-section">
      <AlbumsCounter
        :artist-data="artistData"
        :profile-id="profileId"
      />
    </div>
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
.counter-section
  &:not(:first-child)
    margin-left: 0.75em
</style>
