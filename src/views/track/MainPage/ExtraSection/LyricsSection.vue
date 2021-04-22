<template>
  <div class="ui basic segments">
    <BaseTrackSearchContainer
      sourceId="genius"
      scope="tracks"
      :query="query"
    >
      <template #default="searchSlotProps">
        <TrackSelect
          :isLoading="searchSlotProps.isLoading"
          :isError="searchSlotProps.isError"
          :tracks="searchSlotProps.tracks"
        />
      </template>
    </BaseTrackSearchContainer>

    <BaseTrackLyricsContainer
      v-if="selectedTrackData"
      :key="key"
      :selectedTrackData="selectedTrackData"
    >
      <template #default="lyricsSlotProps">
        <LyricsData
          :lyrics="lyricsSlotProps.lyrics"
          :trackId="lyricsSlotProps.trackId"
        />
      </template>
    </BaseTrackLyricsContainer>
  </div>
</template>

<script>
import BaseTrackSearchContainer
  from '@/containers/track/search/BaseTrackSearchContainer.vue'
import TrackSelect from './LyricsSection/TrackSelect.vue'
import BaseTrackLyricsContainer
  from '@/containers/track/lyrics/BaseTrackLyricsContainer.vue'
import LyricsData from './LyricsSection/LyricsData.vue'
import { generateKey } from '#/utils'

export default {
  name: 'LyricsSection',
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
