<template>
  <div
    class="filter-item middle-aligned-column"
    :class="{
      inverted: isDarkMode,
      disabled: isDisabled
    }"
  >
    <BaseSeeker
      ref="seeker"
      class="vertical reversed labeled ticked filter-seeker main-bottom-extrasmall-section"
      :options="seekerOptions"
      :is-disabled="isDisabled"
      @move="handleMove"
      @mouse-up="handleMouseUp"
    />

    <div class="main-bottom-large-section pointer-events-none">
      <BaseHeader
        tag="h5"
        :text="frequencyTextFormatted"
        :class="{
          disabled: isDisabled
        }"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import layoutStore from '@/stores/layout'
import BaseHeader from '@/components/headers/BaseHeader.vue'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  audioEqualizerFilter as audioEqualizerFilterSeekerOptions
} from '@/helpers/formatters/plugins/semantic/options/seeker'

export default {
  name: 'FilterItem',
  components: {
    BaseHeader,
    BaseSeeker
  },
  props: {
    filterData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  emits: [
    'init',
    'move',
    'change'
  ],
  computed: {
    ...mapState(
      audioStore,
      {
        audioContext: 'context',
        isAudioEqualizerEnabled: 'isEqualizerEnabled'
      }
    ),
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    seekerOptions () {
      return audioEqualizerFilterSeekerOptions(
        {
          start: this.gain
        }
      )
    },
    gain () {
      return this.filterData.gain
    },
    frequencyTextFormatted () {
      if (this.frequency >= 1000) {
        return this.frequencyKilohertzText
      } else {
        return this.frequencyHertzText
      }
    },
    frequency () {
      return this.filterData.frequency
    },
    frequencyKilohertzText () {
      return this.$t(
        'player.audio.equalizer.kilohertz',
        {
          value: this.frequency / 1000
        }
      )
    },
    frequencyHertzText () {
      return this.$t(
        'player.audio.equalizer.hertz',
        {
          value: this.frequency
        }
      )
    },
    isDisabled () {
      return !this.isAudioEqualizerEnabled
    },
    type () {
      return this.filterData.type
    }
  },
  watch: {
    gain: 'handleGainChange'
  },
  mounted () {
    this.initFilterElement()
  },
  methods: {
    handleGainChange (
      value
    ) {
      this.setSeekerValue(
        value
      )
    },
    handleMove (
      value
    ) {
      this.$emit(
        'move',
        {
          index: this.index,
          value
        }
      )
    },
    handleMouseUp (
      value
    ) {
      this.$emit(
        'change',
        {
          index: this.index,
          value
        }
      )
    },
    initFilterElement () {
      const filterElement =
        this.audioContext.createBiquadFilter()

      filterElement.type = this.type

      filterElement.frequency.value = this.frequency

      filterElement.Q.value = 1

      filterElement.gain.value = this.gain

      this.$emit(
        'init',
        {
          index: this.index,
          filterElement
        }
      )
    },
    setSeekerValue (
      value
    ) {
      this.$refs
        .seeker
        .setValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
