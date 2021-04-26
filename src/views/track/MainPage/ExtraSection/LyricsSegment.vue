<template>
  <div class="ui basic segments">
    <BaseTrackSearchContainer
      sourceId="genius"
      scope="tracks"
      :query="query"
    >
      <template #default="slotProps">
        <TrackSelect
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
  </div>
</template>

<script>
import BaseTrackSearchContainer
  from '@/containers/track/search/BaseTrackSearchContainer.vue'
import TrackSelect from './LyricsSegment/TrackSelect.vue'
import BaseTrackLyricsContainer
  from '@/containers/track/lyrics/BaseTrackLyricsContainer.vue'
import LyricsData from './LyricsSegment/LyricsData.vue'
import { generateKey } from '#/utils'

export default {
  name: 'LyricsSegment',
  components: {
    BaseTrackSearchContainer,
    TrackSelect,
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
      key: null
    }
  },
  watch: {
    selectedTrackData: 'handleSelectedTrackDataChange'
  },
  methods: {
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
