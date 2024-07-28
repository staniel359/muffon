<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getAlbum from '@/helpers/actions/api/album/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseAlbumTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    requestAlbumData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      albumData: null
    }
  },
  computed: {
    albumArgs () {
      return {
        ...this.requestAlbumData
      }
    },
    tracksData () {
      return this.albumData
    }
  },
  methods: {
    getAlbum,
    getTracksData () {
      return this.getAlbum(
        this.albumArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
