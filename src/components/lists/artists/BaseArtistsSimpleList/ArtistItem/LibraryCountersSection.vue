<template>
  <TracksCounter
    :artist-data="artistData"
    :profile-id="profileId"
    :top-tracks-count="topTracksCount"
    @link-active-change="handleLinkActiveChange"
    @link-click="handleLinkClick"
  />

  <AlbumsCounter
    :artist-data="artistData"
    :profile-id="profileId"
    :top-albums-count="topAlbumsCount"
    @link-active-change="handleLinkActiveChange"
    @link-click="handleLinkClick"
  />
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
    profileId: String,
    topTracksCount: Number,
    topAlbumsCount: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  methods: {
    handleLinkActiveChange (
      value
    ) {
      this.$emit(
        'linkActiveChange',
        value
      )
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
