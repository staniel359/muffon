<template>
  <BaseAccordionContainer
    :title="textFormatted"
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
  from '@/containers/track/search/BaseTrackSearchContainer.vue'
import LyricsSelect from './LyricsSegment/LyricsSelect.vue'
import BaseTrackLyricsContainer
  from '@/containers/track/lyrics/BaseTrackLyricsContainer.vue'
import LyricsData from './LyricsSegment/LyricsData.vue'
import { generateKey } from '#/utils'
import { localize } from '#/actions/plugins/i18n'

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
      selectedTrackData: null,
      key: null,
      isOpen: false
    }
  },
  computed: {
    textFormatted () {
      return localize(
        'pages.track.lyrics.find'
      )
    }
  },
  watch: {
    selectedTrackData: 'handleSelectedTrackDataChange'
  },
  methods: {
    handleOpen () {
      this.isOpen = true
    },
    handleSelectedTrackDataChange () {
      this.key = generateKey()
    },
    setSelectedTrackData (value) {
      this.selectedTrackData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
