<template>
  <div
    :class="[
      'description main-small-container',
      'library-counters-section'
    ]"
  >
    <TracksCounter
      class="tracks-link"
      :artist-data="artistData"
      :profile-id="profileId"
      @active-change="handleLinkActiveChange"
    />

    <AlbumsCounter
      :artist-data="artistData"
      :profile-id="profileId"
      @active-change="handleLinkActiveChange"
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
  },
  emits: [
    'linkActiveChange'
  ],
  methods: {
    handleLinkActiveChange (
      value
    ) {
      this.$emit(
        'linkActiveChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.library-counters-section
  @extend .d-flex, .justify-content-center

.tracks-link
  margin-right: 0.5em
</style>
