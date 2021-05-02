<template>
  <i
    class="icon source-icon"
    ref="icon"
    :class="[
      sourceIdFormatted,
      size,
      { colored: isActive }
    ]"
    :data-content="popupTextFormatted"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script>
import { paramCase } from 'param-case'
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'
import { getSourceData as getAudioSourceData } from '#/actions/audio'
import { localize } from '#/actions/plugins/i18n'

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
    sourceIdFormatted () {
      if (this.sourceId) {
        return paramCase(this.sourceId)
      } else {
        return null
      }
    },
    popupTextFormatted () {
      if (this.sourceName) {
        return localize(
          'track.source.via',
          { source: this.sourceName }
        )
      } else {
        return null
      }
    },
    sourceName () {
      return getAudioSourceData(
        this.sourceId
      ).name
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
