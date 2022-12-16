<template>
  <TracksCounter
    :album-data="albumData"
    :profile-id="profileId"
    :width-max-percent="widthMaxPercent"
    :top-tracks-count="topTracksCount"
    :is-dark-mode="isDarkMode"
    @link-active-change="handleLinkActiveChange"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
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
  data () {
    return {
      widthMaxPercent: 70
    }
  },
  computed: {
    ...mapState(
      layoutStore,
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
