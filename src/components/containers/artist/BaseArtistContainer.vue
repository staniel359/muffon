<template>
  <slot
    :artist-data="artistData"
    :is-loading="isLoading"
    :error="error"
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
      artistData: null,
      error: null,
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
    this.getData()
  },
  methods: {
    getArtist,
    getData () {
      this.getArtist(
        this.artistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
