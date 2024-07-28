<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getArtist from '@/helpers/actions/api/artist/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseArtistTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      artistData: null
    }
  },
  computed: {
    artistArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        limit: this.limitComputed
      }
    },
    tracksData () {
      return this.artistData
    }
  },
  methods: {
    getArtist,
    getTracksData () {
      return this.getArtist(
        this.artistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
