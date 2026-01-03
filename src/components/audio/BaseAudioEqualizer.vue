<template>
  <div class="base-audio-equalizer">
    <div
      v-if="isRenderResetButton"
      class="middle-aligned-space-between main-top-mini-section"
    >
      <div />

      <BaseClearButton
        action="reset"
        :is-with-icon="false"
        @click="handleClearButtonClick"
      />
    </div>

    <div class="d-flex">
      <FilterItem
        v-for="(filterData, index) in filters"
        :key="filterData.key"
        :filter-data="filterData"
        :index="index"
        @init="handleFilterInit"
        @move="handleFilterMove"
        @change="handleFilterChange"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'

import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import FilterItem from './BaseAudioEqualizer/FilterItem.vue'

import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseAudioEqualizer',
  components: {
    BaseClearButton,
    FilterItem
  },
  data () {
    return {
      filters: [
        {
          key: null,
          type: 'peaking',
          frequency: 30,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 60,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 125,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 250,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 500,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 1000,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 2000,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 4000,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 8000,
          gain: 0,
          filterElement: null
        },
        {
          key: null,
          type: 'peaking',
          frequency: 16000,
          gain: 0,
          filterElement: null
        }
      ]
    }
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioContext: 'context',
        audioSource: 'source',
        isAudioEqualizerEnabled: 'isEqualizerEnabled',
        audioEqualizerGains: 'equalizerGains'
      }
    ),
    audioOutput () {
      return this.audioContext.destination
    },
    audioItems () {
      return [
        this.audioSource,
        ...this.filtersElements,
        this.audioOutput
      ]
    },
    filtersElements () {
      return this.filters.map(
        filterData => {
          return filterData.filterElement
        }
      )
    },
    filtersGains () {
      return this.filters.map(
        filterData => {
          return filterData.gain
        }
      )
    },
    isRenderResetButton () {
      return (
        this.isAudioEqualizerEnabled &&
          this.isGainsChanged
      )
    },
    isGainsChanged () {
      return this.filters.some(
        filterData => {
          return filterData.gain !== 0
        }
      )
    }
  },
  watch: {
    filtersGains: 'handleFiltersGainsChange',
    isAudioEqualizerEnabled:
      'handleIsAudioEqualizerEnabledChange'
  },
  beforeMount () {
    this.filters.forEach(
      filterData => {
        filterData.key = generateKey()
      }
    )

    this.audioEqualizerGains.forEach(
      (
        value,
        index
      ) => {
        this.setFilterGain(
          {
            index,
            value
          }
        )
      }
    )
  },
  mounted () {
    if (this.isAudioEqualizerEnabled) {
      this.toggleAudioConnections(
        true
      )
    }
  },
  beforeUnmount () {
    if (this.isAudioEqualizerEnabled) {
      this.toggleAudioConnections(
        false
      )
    }
  },
  methods: {
    handleFiltersGainsChange (
      value
    ) {
      updateGlobalStore(
        {
          'audio.equalizerGains': value
        }
      )
    },
    handleIsAudioEqualizerEnabledChange (
      value
    ) {
      this.toggleAudioConnections(
        value
      )
    },
    handleFilterInit (
      {
        index,
        filterElement
      }
    ) {
      this.setFilterElement(
        {
          index,
          value: filterElement
        }
      )
    },
    handleFilterMove (
      {
        index,
        value
      }
    ) {
      this.setFilterElementGain(
        {
          index,
          value
        }
      )
    },
    handleClearButtonClick () {
      this.filters.forEach(
        (
          _,
          index
        ) => {
          this.resetFilterGain(
            {
              index
            }
          )
        }
      )
    },
    handleFilterChange (
      {
        index,
        value
      }
    ) {
      this.setFilterGain(
        {
          index,
          value
        }
      )
    },
    setFilterElement (
      {
        index,
        value
      }
    ) {
      this.filters[index].filterElement = value
    },
    setFilterGain (
      {
        index,
        value
      }
    ) {
      this.filters[index].gain = value
    },
    resetFilterGain (
      {
        index
      }
    ) {
      this.setFilterGain(
        {
          index,
          value: 0
        }
      )
    },
    setFilterElementGain (
      {
        index,
        value
      }
    ) {
      this.filters[index].filterElement.gain.value = value
    },
    toggleAudioConnections (
      boolean
    ) {
      function toggleAudioConnection (
        audioItem,
        index,
        audioItems
      ) {
        const nextAudioItem = audioItems[index + 1]

        if (!nextAudioItem) { return }

        if (boolean) {
          audioItem.connect(
            nextAudioItem
          )
        } else {
          audioItem.disconnect(
            nextAudioItem
          )
        }
      }

      this.audioItems.forEach(
        toggleAudioConnection
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
