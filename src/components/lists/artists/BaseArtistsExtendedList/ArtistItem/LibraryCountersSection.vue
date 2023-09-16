<template>
  <div class="library-counters-container">
    <TracksCounterSection
      class="library-counter-section"
      :artist-data="artistData"
      :profile-id="profileId"
    />

    <AlbumsCounterSection
      class="library-counter-section"
      :artist-data="artistData"
      :profile-id="profileId"
    />
  </div>
</template>

<script>
import TracksCounterSection
  from './LibraryCountersSection/TracksCounterSection.vue'
import AlbumsCounterSection
  from './LibraryCountersSection/AlbumsCounterSection.vue'

export default {
  name: 'LibraryCountersSection',
  components: {
    TracksCounterSection,
    AlbumsCounterSection
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
  margin-top: 0.75em

[dir="ltr"]
  .library-counter-section
    &:not(:first-child)
      margin-left: 1em
[dir="rtl"]
  .library-counter-section
    &:not(:first-child)
      margin-right: 1em
</style>
