<template>
  <BaseBookmarkOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption
  from '*/components/dropdowns/options/bookmark/BaseBookmarkOption.vue'
import createBookmarkTrack from '*/helpers/actions/api/bookmark/track/create'

export default {
  name: 'AddOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    },
    albumTitle: String,
    imageUrl: String,
    sourceData: Object,
    audioData: Object,
    albumSourceData: Object
  },
  data () {
    return {
      bookmarkId: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    createArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl,
        sourceData: this.sourceData,
        audioData: this.audioDataFormatted,
        albumSourceData: this.albumSourceData
      }
    },
    audioDataFormatted () {
      return this.audioData && {
        present: this.audioData.present
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createBookmarkTrack,
    handleClick () {
      this.createBookmarkTrack(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setBookmarkId(
          this.bookmarkId
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
