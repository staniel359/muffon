<template>
  <BaseSearchInput
    ref="input"
    class="search-input"
    :url="url"
    :fields="fields"
    :format-response="formatResponse"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapGetters,
  mapState
} from 'vuex'
import BaseSearchInput from '@/components/inputs/BaseSearchInput.vue'

export default {
  name: 'SearchInput',
  components: {
    BaseSearchInput
  },
  inject: [
    'addCollectionItem',
    'reset'
  ],
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    isSave: Boolean
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      'profile',
      {
        profileToken: 'token'
      }
    ),
    url () {
      return (
        `profiles/${this.profileId}` +
        '/library/search/tracks' +
        '?query={query}&limit=5' +
        `&token=${this.profileToken}`
      )
    },
    fields () {
      return {
        results: 'tracks',
        title: 'title',
        description: 'artistName',
        image: null
      }
    }
  },
  methods: {
    handleSelect (
      track
    ) {
      if (this.isSave) {
        this.reset()
      }

      this.addCollectionItem(
        {
          collection: 'collection',
          item: track
        }
      )

      this.clear()
    },
    formatResponse (
      response
    ) {
      const {
        tracks
      } = response.profile.library

      return tracks.map(
        this.formatTrack
      )
    },
    formatTrack (
      trackData
    ) {
      return {
        ...trackData,
        artistName:
          trackData.artist.name
      }
    },
    focus () {
      this.$refs
        .input
        .focus()
    },
    clear () {
      this.$refs
        .input
        .clear()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-input
  @extend .flex-full
</style>
