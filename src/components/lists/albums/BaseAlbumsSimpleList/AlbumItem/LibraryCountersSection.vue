<template>
  <TracksCounter
    :album-data="albumData"
    :profile-id="profileId"
    :top-tracks-count="topTracksCount"
    @link-active-change="handleLinkActiveChange"
  />
</template>

<script>
import TracksCounter from './LibraryCountersSection/TracksCounter.vue'

export default {
  name: 'LibraryCountersSection',
  components: {
    TracksCounter
  },
  props: {
    albumData: Object,
    profileId: String,
    topTracksCount: Number
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

<style lang="sass" scoped></style>
