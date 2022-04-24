<template>
  <div
    :class="{
      active: isCurrent
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
  mapState,
  mapGetters
} from 'vuex'
import getPlayerVariant from '*/helpers/actions/player/variant/get'

export default {
  name: 'BaseTrackVariantContainer',
  props: {
    variantData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    ...mapState(
      'audio',
      {
        audioElement: 'element'
      }
    ),
    ...mapState(
      'player',
      {
        playerCurrentVariantId: 'currentVariantId'
      }
    ),
    ...mapGetters(
      'audio',
      {
        audioAction: 'action'
      }
    ),
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
        variantId: this.variantId
      }
    }
  },
  methods: {
    handleClick () {
      if (this.isCurrent) {
        this.callAudioAction()
      } else if (!this.isLoading) {
        this.getAudio()
      }
    },
    callAudioAction () {
      this.audioElement[
        this.audioAction
      ]()
    },
    getPlayerVariant,
    getAudio () {
      this.getPlayerVariant(
        this.playerVariantArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
