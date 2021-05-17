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
import fetchArtistData from '#/actions/api/artist/fetchData'

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
      this.error = null

      this.fetchData()
    },
    fetchArtistData,
    fetchData () {
      this.fetchArtistData({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
