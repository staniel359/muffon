<template>
  <div class="base-audio-equalizer">
    <div class="middle-aligned-space-between">
      <div class="middle-aligned">
        <BaseToggle
          :is-checked="isAudioEqualizerEnabled"
          store-key="audio.isEqualizerEnabled"
        />
      </div>

      <div class="middle-aligned">
        <BaseClearButton
          v-if="isAudioEqualizerEnabled"
          @click="handleClearButtonClick"
        />
      </div>
    </div>

    <div class="d-flex main-bottom-section">
      <EqualizerItem
        v-for="(equalizerData, index) in audioEqualizers"
        :ref="equalizerData.key"
        :key="equalizerData.key"
        :index="index"
        :equalizer-data="equalizerData"
        @change="handleEqualizerChange"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import EqualizerItem from './BaseAudioEqualizer/EqualizerItem.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'BaseAudioEqualizer',
  components: {
    BaseToggle,
    BaseClearButton,
    EqualizerItem
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioContext: 'context',
        audioSource: 'source',
        isAudioEqualizerEnabled:
          'isEqualizerEnabled',
        audioEqualizers: 'equalizers'
      }
    ),
    audioOutput () {
      return this.audioContext.destination
    },
    audioItems () {
      return [
        this.audioSource,
        ...this.equalizersFormatted,
        this.audioOutput
      ]
    },
    equalizersFormatted () {
      return this.audioEqualizers.map(
        this.formatEqualizerData
      )
    }
  },
  watch: {
    isAudioEqualizerEnabled:
      'handleIsAudioEqualizerEnabledChange'
  },
  mounted () {
    if (this.isAudioEqualizerEnabled) {
      this.setAudioConnections()
    }
  },
  beforeUnmount () {
    if (this.isAudioEqualizerEnabled) {
      this.resetAudioConnections()
    }
  },
  methods: {
    handleIsAudioEqualizerEnabledChange (
      value
    ) {
      if (value) {
        this.setAudioConnections()
      } else {
        this.resetAudioConnections()
      }
    },
    handleClearButtonClick () {
      const equalizers = [
        ...this.audioEqualizers
      ]

      function resetEqualizer (
        equalizerData
      ) {
        equalizerData.gain = 0
      }

      equalizers.forEach(
        resetEqualizer
      )

      updateGlobalStore(
        {
          'audio.equalizers': equalizers
        }
      )
    },
    handleEqualizerChange (
      data
    ) {
      function isMatchedEqualizer (
        equalizerData
      ) {
        return (
          equalizerData.key === data.key
        )
      }

      const equalizers = [
        ...this.audioEqualizers
      ]

      const equalizer =
        equalizers.find(
          isMatchedEqualizer
        )

      Object.assign(
        equalizer,
        data
      )

      updateGlobalStore(
        {
          'audio.equalizers': equalizers
        }
      )
    },
    formatEqualizerData (
      {
        key
      }
    ) {
      return this.$refs[
        key
      ][0].equalizer
    },
    setAudioConnections () {
      this.toggleAudioConnections(
        true
      )
    },
    toggleAudioConnections (
      boolean
    ) {
      const maxCount = (
        this.audioItems.length - 1
      )

      function toggleConnection (
        first,
        second
      ) {
        const action = (
          boolean ? 'connect' : 'disconnect'
        )

        try {
          first[
            action
          ](
            second
          )
        } catch {
          return null
        }
      }

      for (
        let i = 0;
        i < maxCount;
        i++
      ) {
        toggleConnection(
          this.audioItems[i],
          this.audioItems[i + 1]
        )
      }
    },
    resetAudioConnections () {
      this.toggleAudioConnections(
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
