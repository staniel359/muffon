<template>
  <TracksCounter
    :album-data="albumData"
    :profile-id="profileId"
    :top-tracks-count="topTracksCount"
    @link-active-change="handleLinkActiveChange"
    @link-click="handleLinkClick"
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
