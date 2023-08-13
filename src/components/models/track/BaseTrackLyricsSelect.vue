<template>
  <div>
    <BaseTrackLyricsSourceSelect
      :track-data="trackData"
      @reset="handleReset"
    />

    <LyricsSection
      v-if="selectedTrackData"
      :key="key"
      :track-data="trackData"
      :selected-track-data="selectedTrackData"
      @focus="handleFocus"
    />
  </div>
</template>

<script>
import BaseTrackLyricsSourceSelect
  from '@/components/models/track/lyrics/BaseTrackLyricsSourceSelect.vue'
import LyricsSection from './BaseTrackLyricsSelect/LyricsSection.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseTrackLyricsSelect',
  components: {
    BaseTrackLyricsSourceSelect,
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
      selectedTrackData: null
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
    handleReset () {
      this.selectedTrackData = null
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
