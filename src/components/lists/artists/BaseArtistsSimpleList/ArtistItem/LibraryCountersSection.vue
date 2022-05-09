<template>
  <TracksCounter
    :artist-data="artistData"
    :profile-id="profileId"
    :width-max-percent="widthMaxPercent"
    :top-tracks-count="topTracksCount"
    :is-dark-mode="isDarkMode"
    @link-active-change="handleLinkActiveChange"
  />

  <AlbumsCounter
    :artist-data="artistData"
    :profile-id="profileId"
    :width-max-percent="widthMaxPercent"
    :top-albums-count="topAlbumsCount"
    :is-dark-mode="isDarkMode"
    @link-active-change="handleLinkActiveChange"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
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
    'linkActiveChange'
  ],
  data () {
    return {
      widthMaxPercent: 70
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  },
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
.counter-section
  @extend .d-flex, .align-items-center

::v-deep(.counter-bar)
  @extend .background-grey
  height: 4px
  border-radius: 2px
  margin-right: 0.5em
  &.inverted
    @extend .background-grey-inverted
</style>
