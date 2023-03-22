<template>
  <BaseBookmarkOption
    action="add"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption
  from '@/components/popups/options/BaseBookmarkOption.vue'
import createBookmarkTrack from '@/helpers/actions/api/bookmark/track/create'

export default {
  name: 'AddOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      bookmarkId: null,
      isLoading: false,
      isError: false,
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
        audioData:
          this.audioDataFormatted,
        albumSourceData:
          this.albumSourceData
      }
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    albumTitle () {
      return this.albumData?.title
    },
    albumData () {
      return this.trackData.album
    },
    imageUrl () {
      return this.trackData.image?.large
    },
    sourceData () {
      return this.trackData.source
    },
    audioDataFormatted () {
      return this.audioData && {
        present: this.audioData.present
      }
    },
    audioData () {
      return this.trackData.audio
    },
    albumSourceData () {
      return this.albumData?.source
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
