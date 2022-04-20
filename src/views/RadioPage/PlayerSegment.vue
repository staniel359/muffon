<template>
  <BaseSegmentContainer
    class="track-segment"
    :response-data="radioData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <template v-if="modelName">
      <PlayerLabel
        :scope="scope"
        :model-name="modelName"
        :model-scope="modelScope"
      />

      <BaseErrorMessage
        v-if="error"
        class="error-message"
        :error="error"
      />

      <TrackSection
        v-if="trackData"
        ref="track"
        :track-data="trackData"
      />

      <div class="next-button-container">
        <BaseButton
          class="basic compact next-button"
          icon="forward right"
          :text="nextText"
          is-reverse
          @click="handleNextButtonClick"
        />
      </div>
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import PlayerLabel from './PlayerSegment/PlayerLabel.vue'
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import TrackSection from './PlayerSegment/TrackSection.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import getRadio from '*/helpers/actions/api/radio/get'

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
        'actions.next'
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
    getRadio,
    handleNextButtonClick () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    fetchData () {
      this.getRadio(
        this.radioArgs
      ).then(
        this.fetchAudio
      )
    },
    fetchAudio () {
      if (this.trackData) {
        this.$refs
          .track
          .fetchAudio()
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
  .next-button
    @extend .no-margin
</style>
