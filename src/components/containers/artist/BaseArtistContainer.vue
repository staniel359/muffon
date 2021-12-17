<template>
  <slot
    :isLoading="isLoading"
    :error="error"
    :artistData="artistData"
    :handleRefresh="handleRefresh"
  >
  </slot>
</template>

<script>
import getArtist from '#/actions/api/artist/get'

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
    handleRefresh () {
      this.fetchData()
    },
    getArtist,
    fetchData () {
      this.getArtist({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
