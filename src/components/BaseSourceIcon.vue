<template>
  <i
    class="icon source-icon"
    ref="icon"
    :class="[
      sourceId,
      size,
      { colored: isActive }
    ]"
    :data-content="popupTextFormatted"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script>
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'
import audioSources from '#/data/audio/sources'

export default {
  name: 'BaseSourceIcon',
  props: {
    sourceId: String,
    size: String
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    popupTextFormatted () {
      if (this.sourceName) {
        return this.$t(
          'shared.track.source',
          { source: this.sourceName }
        )
      } else {
        return null
      }
    },
    sourceName () {
      return this.sourceData?.name
    },
    sourceData () {
      return audioSources.find(sourceData => {
        return sourceData.id === this.sourceId
      })
    }
  },
  mounted () {
    setPopup(
      this.$refs.icon,
      popupOptions()
    )
  },
  methods: {
    handleMouseEnter () {
      this.isActive = true
    },
    handleMouseLeave () {
      this.isActive = false
    }
  }
}
</script>

<style lang="sass" scoped>
.source-icon
  @extend .no-padding, .no-margin
</style>
