<template>
  <div class="main-model-source-select-container">
    <div class="content">
      <div>
        <SourceSelect
          ref="select"
          :query="query"
        />

        <div
          v-if="isRenderTrackSelect"
          class="bottom-section"
        >
          <TrackSelect
            :key="key"
            :tracks="selectedSourceTracks"
          />
        </div>
      </div>
    </div>

    <BaseClearButton
      v-if="selectedSourceData"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SourceSelect from './BaseTrackLyricsSourceSelect/SourceSelect.vue'
import TrackSelect from './BaseTrackLyricsSourceSelect/TrackSelect.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseTrackLyricsSourceSelect',
  components: {
    SourceSelect,
    TrackSelect,
    BaseClearButton
  },
  provide () {
    return {
      setSelectedSourceData:
        this.setSelectedSourceData
    }
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'reset'
  ],
  data () {
    return {
      key: null,
      selectedSourceData: null
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
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    selectedSourceTracks () {
      return this.selectedSourceData
        .tracksData
        .tracks
    },
    isRenderTrackSelect () {
      return !!this.selectedSourceData
    }
  },
  watch: {
    selectedSourceData:
      'handleSelectedSourceDataChange'
  },
  methods: {
    handleSelectedSourceDataChange () {
      this.key = generateKey()
    },
    handleClearButtonClick () {
      this.resetSelect()

      this.selectedSourceData = null

      this.$emit(
        'reset'
      )
    },
    setSelectedSourceData (
      value
    ) {
      this.selectedSourceData = value
    },
    resetSelect () {
      this.$refs
        .select
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
