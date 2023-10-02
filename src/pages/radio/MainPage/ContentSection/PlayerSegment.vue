<template>
  <BaseSegmentContainer
    class="flex-full"
    :response-data="radioData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <BaseErrorMessage
      v-if="error"
      :error="error"
    />
    <template
      v-else-if="trackData"
    >
      <TrackSection
        :key="key"
        :track-data="trackData"
      />

      <NextButton
        ref="nextButton"
        @click="handleNextButtonClick"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import hotkeys from 'hotkeys-js'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import TrackSection from './PlayerSegment/TrackSection.vue'
import NextButton from './PlayerSegment/NextButton.vue'
import getRadio from '@/helpers/actions/api/radio/get'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'PlayerSegment',
  components: {
    BaseSegmentContainer,
    BaseErrorMessage,
    TrackSection,
    NextButton
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    modelScope: String,
    modelName: String
  },
  data () {
    return {
      key: null,
      radioData: null,
      error: null,
      isLoading: false,
      nextKeys: 'shift+right'
    }
  },
  computed: {
    trackData () {
      return this.radioData?.track
    },
    radioArgs () {
      return {
        scope: this.scope,
        modelName: this.modelName,
        modelScope: this.modelScope
      }
    },
    isGetData () {
      if (this.isTopScope) {
        return !!this.modelScope
      } else {
        return !!(
          this.modelName &&
            this.modelScope
        )
      }
    },
    isTopScope () {
      return (
        this.scope === 'top'
      )
    }
  },
  watch: {
    trackData: {
      immediate: true,
      handler: 'handleTrackDataChange'
    }
  },
  mounted () {
    if (this.isGetData) {
      this.getData()
    }
  },
  methods: {
    getRadio,
    handleNextButtonClick () {
      this.getData()
    },
    handleRefresh () {
      this.getData()
    },
    handleTrackDataChange (
      value
    ) {
      if (value) {
        this.key = generateKey()

        this.bindNextKeys()
      } else {
        this.unbindNextKeys()
      }
    },
    getData () {
      this.getRadio(
        this.radioArgs
      )
    },
    bindNextKeys () {
      hotkeys(
        'shift+right',
        this.clickNextButton
      )
    },
    clickNextButton () {
      this.$refs
        .nextButton
        .click()
    },
    unbindNextKeys () {
      hotkeys.unbind(
        'shift+right'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
