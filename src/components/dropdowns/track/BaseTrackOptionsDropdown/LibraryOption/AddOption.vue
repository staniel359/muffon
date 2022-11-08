<template>
  <BaseLibraryOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseLibraryOption
  from '@/components/dropdowns/options/library/BaseLibraryOption.vue'
import createLibraryTrack from '@/helpers/actions/api/library/track/create'

export default {
  name: 'AddOption',
  components: {
    BaseLibraryOption
  },
  inject: [
    'setLibraryId'
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      libraryId: null,
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
    createLibraryTrack,
    handleClick () {
      this.createLibraryTrack(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setLibraryId(
          this.libraryId
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
