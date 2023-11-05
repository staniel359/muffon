<template>
  <div
    ref="track"
    :class="{
      active: isActive
    }"
    @click="handleClick"
  >
    <slot
      :is-loading="isLoading"
      :is-error="!!error"
      :is-current="isCurrent"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import playerStore from '@/stores/player'
import getPlayerVariant from '@/helpers/actions/player/variant/get'
import {
  focusOnListElement
} from '@/helpers/actions/layout'

export default {
  name: 'BaseTrackVariantContainer',
  props: {
    variantData: {
      type: Object,
      required: true
    },
    isFromRadio: Boolean,
    isFocusable: Boolean,
    isSegment: Boolean,
    scrollable: HTMLDivElement
  },
  data () {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioElement: 'element',
        audioAction: 'action'
      }
    ),
    ...mapState(
      playerStore,
      {
        playerCurrentVariantId:
          'currentVariantId',
        isPlayerWithPlayingFocus:
          'isWithPlayingFocus'
      }
    ),
    isActive () {
      return this.isCurrent
    },
    isCurrent () {
      return (
        this.variantId ===
          this.playerCurrentVariantId
      )
    },
    variantId () {
      return this.variantData.uuid
    },
    playerVariantArgs () {
      return {
        variantId: this.variantId,
        isFromRadio: this.isFromRadio
      }
    },
    isFocusActive () {
      return (
        this.isFocus &&
          this.isActive
      )
    },
    isFocus () {
      return (
        this.isFocusable &&
          this.isPlayerWithPlayingFocus
      )
    }
  },
  watch: {
    isFocusActive:
      'handleIsFocusActiveChange'
  },
  methods: {
    getPlayerVariant,
    async handleIsFocusActiveChange (
      value
    ) {
      if (value) {
        await this.$nextTick()

        this.focus()
      }
    },
    handleClick () {
      if (this.isCurrent) {
        this.callAudioAction()
      } else if (!this.isLoading) {
        this.getAudio()
      }

      if (this.isFocus) {
        this.focus()
      }
    },
    callAudioAction () {
      this.audioElement[
        this.audioAction
      ]()
    },
    getAudio () {
      this.getPlayerVariant(
        this.playerVariantArgs
      )
    },
    focus () {
      if (this.isSegment) {
        this.focusList()
      }
    },
    focusList () {
      focusOnListElement(
        this.$refs.track,
        this.scrollable
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
