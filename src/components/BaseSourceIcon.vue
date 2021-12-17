<template>
  <i
    class="icon source-icon"
    ref="icon"
    :class="[
      sourceId,
      size,
      { colored: isActive }
    ]"
    :data-content="popupText"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script>
import { mapState } from 'vuex'
import { setPopup } from '#/actions/plugins/semantic'
import { sourcePopupOptions } from '#/data/plugins/semantic'
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
    ...mapState('layout', [
      'isDarkMode'
    ]),
    popupText () {
      if (this.sourceName) {
        return this.$t(
          'track.source',
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
        return (
          sourceData.id ===
            this.sourceId
        )
      })
    },
    popupOptions () {
      return sourcePopupOptions({
        isDarkMode: this.isDarkMode
      })
    }
  },
  watch: {
    isDarkMode: 'handleIsDarkModeChange'
  },
  mounted () {
    this.setSourcePopup()
  },
  methods: {
    handleIsDarkModeChange () {
      this.setSourcePopup()
    },
    handleMouseEnter () {
      this.isActive = true
    },
    handleMouseLeave () {
      this.isActive = false
    },
    setSourcePopup () {
      setPopup(
        this.$refs.icon,
        this.popupOptions
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.source-icon
  @extend .no-padding, .no-margin
</style>
