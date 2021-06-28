<template>
  <div
    :class="{ active: isCurrent }"
    @click="handleClick"
  >
    <slot
      :isLoading="isLoading"
      :isError="!!error"
      :isCurrent="isCurrent"
    ></slot>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import fetchVariantData from '#/actions/player/variant/fetchData'

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
    ...mapState('audio', {
      audioElement: 'element'
    }),
    ...mapState('player', {
      playerCurrentVariantId: 'currentVariantId'
    }),
    ...mapGetters('audio', {
      audioAction: 'action'
    }),
    isCurrent () {
      return (
        this.variantId ===
          this.playerCurrentVariantId
      )
    },
    variantId () {
      return this.variantData.uuid
    },
    variantDataArgs () {
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
        this.fetchAudio()
      }
    },
    callAudioAction () {
      this.audioElement[
        this.audioAction
      ]()
    },
    fetchVariantData,
    fetchAudio () {
      this.fetchVariantData(
        this.variantDataArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
