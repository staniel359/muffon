<template>
  <slot
    :artistData="artistData"
    :isLoading="isLoading"
    :error="error"
    :refresh="refresh"
  >
  </slot>
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
  mounted () {
    this.fetchData()
  },
  methods: {
    getArtist,
    fetchData () {
      this.getArtist({
        artistName: this.artistName
      })
    },
    refresh () {
      this.fetchData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
