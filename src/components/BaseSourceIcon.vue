<template>
  <i
    class="icon"
    ref="icon"
    :class="[sourceIdFormatted, { colored: isActive }]"
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
    sourceId: String
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
      return this.sourceName && this.popupText
    },
    popupText () {
      return localize(
        'track.source.via',
        { source: this.sourceName }
      )
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

<style lang="sass" scoped></style>
