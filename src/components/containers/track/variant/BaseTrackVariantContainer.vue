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
import fetchVariantData from '#/actions/player/variant/fetchData'
import {
  getIsCurrentVariant as getIsPlayerCurrentVariant
} from '#/actions/player'
import { toggleAction as toggleAudioAction } from '#/actions/audio'

export default {
  name: 'BaseTrackVariantContainer',
  props: {
    index: {
      type: Number,
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
    isCurrent () {
      return getIsPlayerCurrentVariant({
        variantIndex: this.index
      })
    },
    variantDataArgs () {
      return { index: this.index }
    }
  },
  methods: {
    handleClick () {
      if (this.isCurrent) {
        toggleAudioAction()
      } else {
        !this.isLoading && this.fetchAudio()
      }
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
