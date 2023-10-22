<template>
  <div>
    <BaseTrackLyricsSourceSelect
      :track-data="trackData"
      @reset="handleReset"
    />

    <LyricsSection
      v-if="selectedTrackData"
      :key="key"
      ref="lyrics"
      class="main-bottom-section"
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
import {
  focusOnPageElement
} from '@/helpers/actions/layout'

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
    async handleSelectedTrackDataChange (
      value
    ) {
      if (value) {
        this.key = generateKey()

        await this.$nextTick()

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
      focusOnPageElement(
        this.$refs.lyrics.$el
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
