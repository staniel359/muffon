<template>
  <slot
    :is-loading="isLoading"
    :error="error"
  />
</template>

<script>
import getArtist from '*/helpers/actions/api/artist/get'

export default {
  name: 'BaseArtistContainer',
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    requestArtistData: {
      type: Object,
      required: true
    },
    isGetData: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      artistData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    artistArgs () {
      return {
        artistName: this.artistName
      }
    },
    artistName () {
      return this.requestArtistData.name
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.requestArtistData.uuid
    }
  },
  watch: {
    artistData: 'handleArtistDataChange'
  },
  mounted () {
    if (this.isGetData) {
      this.getData()
    }
  },
  methods: {
    getArtist,
    handleArtistDataChange (
      value
    ) {
      this.paginationItem.responseData = value
    },
    getData () {
      this.getArtist(
        this.artistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
