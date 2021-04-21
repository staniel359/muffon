<template>
  <div class="track-select-container">
    <LogoBlock />

    <div
      class="ui dropdown main-dropdown-item"
      ref="dropdown"
      :class="{ disabled: !isAnyTracks }"
    >
      <div class="text">
        {{ headerFormatted }}
      </div>

      <BaseIcon
        class="icon-right"
        icon="dropdown"
        :isLoading="isLoading"
        :isError="!!error"
      />

      <TracksList :tracks="tracks" />
    </div>
  </div>
</template>

<script>
import LogoBlock from './TrackSelect/LogoBlock.vue'
import BaseIcon from '@/BaseIcon.vue'
import TracksList from './TrackSelect/TracksList.vue'
import fetchSearchData from '#/actions/api/search/fetchData'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { setDropdown, selectDropdownValue } from '#/actions/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'LyricsSelect',
  components: {
    LogoBlock,
    BaseIcon,
    TracksList
  },
  inject: [
    'setSelectedTrackData'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      searchData: null,
      isLoading: false
    }
  },
  computed: {
    searchDataArgs () {
      return {
        sourceId: 'genius',
        scope: 'tracks',
        query: this.query
      }
    },
    query () {
      return `${this.artistName} - ${this.trackTitle}`
    },
    isAnyTracks () {
      return this.tracks.length
    },
    tracks () {
      return this.searchData?.tracks || []
    },
    headerFormatted () {
      if (!this.isAnyTracks) {
        if (this.isLoading) {
          return this.loadingHeaderFormatted
        } else {
          return this.noLyricsHeaderFormatted
        }
      } else {
        return null
      }
    },
    loadingHeaderFormatted () {
      return localize(
        'pages.track.lyrics.loading'
      )
    },
    noLyricsHeaderFormatted () {
      return localize(
        'pages.track.lyrics.empty'
      )
    }
  },
  watch: {
    tracks: 'handleTracksChange'
  },
  mounted () {
    this.fetchData()

    setDropdown(
      this.$refs.dropdown,
      mainDropdownOptions()
    )
  },
  methods: {
    handleTracksChange (value) {
      if (value.length) {
        this.$nextTick(() => {
          this.selectDropdownFirstItem()
        })
      }
    },
    selectDropdownFirstItem () {
      selectDropdownValue(
        this.$refs.dropdown, 0
      )

      this.setSelectedTrackData(
        this.tracks[0]
      )
    },
    fetchSearchData,
    fetchData () {
      this.fetchSearchData(
        this.searchDataArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.track-select-container
  @extend .d-flex, .align-items-center
</style>
