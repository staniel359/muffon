<template>
  <div class="ui segment main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseImage
        :image="geniusLogo"
        isRounded
      />
    </div>

    <div
      class="ui scrolling floating dropdown main-dropdown"
      ref="dropdown"
      :class="{ disabled: !isAnyTracks }"
    >
      <div class="text main-dropdown-item">
        {{ headerFormatted }}
      </div>

      <BaseIcon
        class="main-dropdown-icon main-dropdown-right-icon"
        icon="dropdown"
        :isLoading="isLoading"
        :isError="isError"
      />

      <TracksList :tracks="tracks" />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import BaseIcon from '@/BaseIcon.vue'
import TracksList from './TrackSelect/TracksList.vue'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { setDropdown, selectDropdownValue } from '#/actions/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'TrackSelect',
  components: {
    BaseImage,
    BaseIcon,
    TracksList
  },
  inject: [
    'setSelectedTrackData'
  ],
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    isLoading: Boolean,
    isError: Boolean
  },
  computed: {
    geniusLogo () {
      return (
        'https://assets.genius.com' +
        '/images/apple-touch-icon.png'
      )
    },
    isAnyTracks () {
      return !!this.tracks.length
    },
    headerFormatted () {
      if (this.isShowHeader) {
        return localize(
          `pages.track.lyrics.${this.headerKey}`
        )
      } else {
        return null
      }
    },
    isShowHeader () {
      return (
        !this.isAnyTracks &&
          this.headerKey
      )
    },
    headerKey () {
      if (this.isLoading) {
        return 'loading'
      } else if (this.isError) {
        return 'error'
      } else if (!this.isAnyTracks) {
        return 'empty'
      } else {
        return null
      }
    }
  },
  watch: {
    tracks: 'handleTracksChange'
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      mainDropdownOptions()
    )
  },
  methods: {
    handleTracksChange (value) {
      if (value.length) {
        this.selectFirstTrack()
      }
    },
    selectFirstTrack () {
      this.setSelectedTrackData(
        this.tracks[0]
      )

      this.$nextTick(() => {
        selectDropdownValue(
          this.$refs.dropdown, 0
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.main-dropdown
  width: $trackPageDropdownWidth
</style>
