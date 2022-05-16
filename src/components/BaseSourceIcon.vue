<template>
  <i
    ref="icon"
    class="icon source-icon"
    :class="[
      source,
      size,
      {
        colored: isActive
      }
    ]"
    :data-content="popupText"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  setPopup
} from '*/helpers/actions/plugins/semantic'
import {
  sourcePopupOptions
} from '*/helpers/data/plugins/semantic'
import audioSources from '*/helpers/data/audio/sources'

export default {
  name: 'BaseSourceIcon',
  props: {
    source: String,
    size: String
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    popupText () {
      if (this.sourceName) {
        return this.$t(
          'track.source',
          {
            source: this.sourceName
          }
        )
      } else {
        return null
      }
    },
    sourceName () {
      return this.sourceData?.name
    },
    sourceData () {
      return audioSources.find(
        this.isMatchedSource
      )
    },
    popupOptions () {
      return sourcePopupOptions(
        {
          isDarkMode: this.isDarkMode
        }
      )
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
    },
    isMatchedSource (
      sourceData
    ) {
      return (
        sourceData.id ===
          this.source
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.source-icon
  @extend .no-padding, .no-margin
  min-width: unset !important
</style>
