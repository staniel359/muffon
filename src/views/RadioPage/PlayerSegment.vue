<template>
  <BaseSegmentContainer
    class="track-segment"
    :isLoading="isLoading"
  >
    <template v-if="modelName">
      <PlayerLabel
        :scope="scope"
        :modelName="modelName"
        :modelScope="modelScope"
      />

      <BaseError
        v-if="error"
        class="error-message"
        :error="error"
        :isWithButton="false"
      />

      <TrackSection
        v-if="trackData"
        ref="track"
        :trackData="trackData"
      />

      <div class="next-button-container">
        <BaseButton
          class="compact"
          icon="right arrow"
          :text="nextFormatted"
          isReverse
          @click="handleNextButtonClick"
        />
      </div>
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import PlayerLabel from './PlayerSegment/PlayerLabel.vue'
import BaseError from '@/BaseErrorMessage.vue'
import TrackSection from './PlayerSegment/TrackSection.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import fetchRadioData from '#/actions/api/radio/fetchData'

export default {
  name: 'PlayerSegment',
  components: {
    BaseSegmentContainer,
    PlayerLabel,
    BaseError,
    TrackSection,
    BaseButton
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    modelScope: {
      type: String,
      required: true
    },
    modelName: String
  },
  data () {
    return {
      radioData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    trackData () {
      return this.radioData?.track
    },
    nextFormatted () {
      return this.$t(
        'shared.next'
      )
    },
    radioDataArgs () {
      return {
        scope: this.scope,
        modelName: this.modelName,
        modelScope: this.modelScope
      }
    }
  },
  mounted () {
    if (this.modelName) {
      this.fetchData()
    }
  },
  methods: {
    handleNextButtonClick () {
      this.fetchData()
    },
    fetchRadioData,
    fetchData () {
      this.fetchRadioData(
        this.radioDataArgs
      ).then(this.fetchAudio)
    },
    fetchAudio () {
      if (!this.error) {
        this.$refs.track.fetchAudio()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.track-segment
  @extend .flex-full

.error-message
  margin: 1em 0

.next-button-container
  @extend .d-flex, .justify-content-flex-end
</style>
