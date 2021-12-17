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

      <BaseErrorMessage
        v-if="error"
        class="error-message"
        :error="error"
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
          :text="nextText"
          isReverse
          @click="handleNextButtonClick"
        />
      </div>
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import PlayerLabel from './PlayerSegment/PlayerLabel.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import TrackSection from './PlayerSegment/TrackSection.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import getRadio from '#/actions/api/radio/get'

export default {
  name: 'PlayerSegment',
  components: {
    BaseSegmentContainer,
    PlayerLabel,
    BaseErrorMessage,
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
    nextText () {
      return this.$t(
        'shared.next'
      )
    },
    radioArgs () {
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
    getRadio,
    fetchData () {
      this.getRadio(
        this.radioArgs
      ).then(
        this.fetchAudio
      )
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
