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
    },
    isVisible: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'loadEnd'
  ],
  data () {
    return {
      error: null,
      artistData: null,
      isLoading: true
    }
  },
  watch: {
    isVisible: 'handleIsVisibleChange',
    isLoading: {
      immediate: true,
      handler: 'handleIsLoadingChange'
    }
  },
  mounted () {
    if (this.isVisible) {
      this.fetchData()
    }
  },
  methods: {
    handleIsVisibleChange (value) {
      value && this.fetchData()
    },
    handleIsLoadingChange (value) {
      !value && this.$emit('loadEnd')
    },
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
