<template>
  <slot
    :artist-data="artistData"
    :is-loading="isLoading"
    :error="error"
    :refresh="refresh"
  />
</template>

<script>
import getArtist from '*/helpers/actions/api/artist/get'

export default {
  name: 'BaseArtistContainer',
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      artistData: null,
      isLoading: true
    }
  },
  computed: {
    artistArgs () {
      return {
        artistName: this.artistName
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getArtist,
    fetchData () {
      this.getArtist(
        this.artistArgs
      )
    },
    refresh () {
      this.fetchData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
