<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getSavedTracks from '@/helpers/actions/local/savedTracks/get'
import getSavedTracksSearch
  from '@/helpers/actions/local/savedTracks/search/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseSavedTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    order: String,
    query: String
  },
  data () {
    return {
      savedTracksData: null
    }
  },
  computed: {
    savedTracksArgs () {
      return {
        order: this.order,
        query: this.query
      }
    },
    tracksData () {
      return this.savedTracksData
    }
  },
  methods: {
    getSavedTracks,
    getSavedTracksSearch,
    getTracksData () {
      if (this.query) {
        return this.getSavedTracksSearch(
          this.savedTracksArgs
        )
      } else {
        return this.getSavedTracks(
          this.savedTracksArgs
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
