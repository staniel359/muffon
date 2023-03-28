<template>
  <div>
    <SelectSection
      :scope="scope"
      :query="query"
    />

    <LyricsSection
      v-if="selectedTrackData"
      :key="key"
      :selected-track-data="selectedTrackData"
      @focus="handleFocus"
    />
  </div>
</template>

<script>
import SelectSection from './BaseTrackLyricsSelect/SelectSection.vue'
import LyricsSection from './BaseTrackLyricsSelect/LyricsSection.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseTrackLyricsSelect',
  components: {
    SelectSection,
    LyricsSection
  },
  provide () {
    return {
      setSelectedTrackData:
        this.setSelectedTrackData
    }
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      key: null,
      selectedTrackData: null,
      scope: 'tracks'
    }
  },
  computed: {
    query () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  },
  watch: {
    selectedTrackData:
      'handleSelectedTrackDataChange'
  },
  methods: {
    handleSelectedTrackDataChange (
      value
    ) {
      if (value) {
        this.key = generateKey()

        this.focus()
      }
    },
    handleFocus () {
      this.focus()
    },
    setSelectedTrackData (
      value
    ) {
      this.selectedTrackData = {
        ...value
      }
    },
    focus () {
      this.$emit(
        'focus'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
