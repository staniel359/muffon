<template>
  <BaseAccordionContainer
    :title="findText"
    @init="handleInit"
    @open="handleOpen"
  >
    <BaseTrackSearchContainer
      v-if="isOpen"
      sourceId="genius"
      scope="tracks"
      :query="query"
    >
      <template #default="slotProps">
        <LyricsSelect
          :isLoading="slotProps.isLoading"
          :isError="slotProps.isError"
          :tracks="slotProps.tracks"
        />
      </template>
    </BaseTrackSearchContainer>

    <BaseTrackLyricsContainer
      v-if="selectedTrackData"
      :key="key"
      :selectedTrackData="selectedTrackData"
    >
      <template #default="slotProps">
        <LyricsData
          :lyrics="slotProps.lyrics"
          :trackId="slotProps.trackId"
        />
      </template>
    </BaseTrackLyricsContainer>
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import BaseTrackSearchContainer
  from '@/containers/track/BaseTrackSearchContainer.vue'
import LyricsSelect from './LyricsSegment/LyricsSelect.vue'
import BaseTrackLyricsContainer
  from '@/containers/track/BaseTrackLyricsContainer.vue'
import LyricsData from './LyricsSegment/LyricsData.vue'
import { generateKey } from '#/utils'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'LyricsSegment',
  components: {
    BaseAccordionContainer,
    BaseTrackSearchContainer,
    LyricsSelect,
    BaseTrackLyricsContainer,
    LyricsData
  },
  provide () {
    return {
      setSelectedTrackData: this.setSelectedTrackData
    }
  },
  props: {
    query: String
  },
  data () {
    return {
      segment: null,
      selectedTrackData: null,
      key: null,
      isOpen: false
    }
  },
  computed: {
    findText () {
      return this.$t(
        'pages.track.lyrics.find'
      )
    }
  },
  watch: {
    selectedTrackData: 'handleSelectedTrackDataChange'
  },
  methods: {
    handleInit (el) {
      this.segment = el
    },
    handleOpen () {
      this.isOpen = true
    },
    handleSelectedTrackDataChange () {
      this.key = generateKey()

      focusOnSegment(
        this.segment
      )
    },
    setSelectedTrackData (value) {
      this.selectedTrackData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
