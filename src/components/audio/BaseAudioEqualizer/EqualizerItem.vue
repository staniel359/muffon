<template>
  <div
    class="equalizer-item middle-aligned-column"
    :class="{
      inverted: isDarkMode,
      disabled: isDisabled
    }"
  >
    <BaseSeeker
      ref="seeker"
      class="vertical reversed labeled ticked audio-equalizer-seeker main-bottom-extrasmall-section"
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
  audioEqualizer as audioEqualizerSeekerOptions
} from '@/helpers/formatters/plugins/semantic/options/seeker'

export default {
  name: 'EqualizerItem',
  components: {
    BaseHeader,
    BaseSeeker
  },
  props: {
    equalizerData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'change'
  ],
  data () {
    return {
      equalizer: null
    }
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioContext: 'context',
        isAudioEqualizerEnabled:
          'isEqualizerEnabled'
      }
    ),
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    seekerOptions () {
      return audioEqualizerSeekerOptions(
        {
          start: this.equalizerGain
        }
      )
    },
    equalizerType () {
      return this.equalizerData.type
    },
    equalizerFrequency () {
      return this.equalizerData.frequency
    },
    equalizerGain () {
      return this.equalizerData.gain
    },
    frequencyTextFormatted () {
      if (this.equalizerFrequency >= 1000) {
        return this.frequencyKilohertzText
      } else {
        return this.frequencyHertzText
      }
    },
    frequencyKilohertzText () {
      return this.$t(
        'player.audio.equalizer.kilohertz',
        {
          value: this.equalizerFrequency / 1000
        }
      )
    },
    frequencyHertzText () {
      return this.$t(
        'player.audio.equalizer.hertz',
        {
          value: this.equalizerFrequency
        }
      )
    },
    equalizerKey () {
      return this.equalizerData.key
    },
    isDisabled () {
      return !this.isAudioEqualizerEnabled
    }
  },
  watch: {
    equalizerData: {
      immediate: true,
      handler: 'handleEqualizerDataChange'
    }
  },
  mounted () {
    this.equalizer =
      this.audioContext
        .createBiquadFilter()

    this.equalizer.type =
      this.equalizerType

    this.equalizer.frequency.value =
      this.equalizerFrequency
  },
  methods: {
    async handleEqualizerDataChange (
      {
        gain
      }
    ) {
      await this.$nextTick()

      this.setSeekerGain(
        gain
      )
    },
    handleMove (
      value
    ) {
      this.setGain(
        value
      )
    },
    handleMouseUp (
      value
    ) {
      const data = {
        key: this.equalizerKey,
        gain: value
      }

      this.$emit(
        'change',
        data
      )
    },
    setSeekerGain (
      value
    ) {
      this.$refs
        .seeker
        .setValue(
          value
        )
    },
    setGain (
      value
    ) {
      this.equalizer
        .gain
        .value = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
