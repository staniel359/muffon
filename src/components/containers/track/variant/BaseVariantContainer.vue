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
import trackPlayableMixin from '#/mixins/trackPlayable'
import fetchVariantData from '#/actions/player/variant/fetchData'
import {
  getIsCurrentVariant as getIsPlayerCurrentVariant
} from '#/actions/player'

export default {
  name: 'BaseVariantContainer',
  mixins: [
    trackPlayableMixin
  ],
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
