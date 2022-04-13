<template>
  <div ref="segment">
    <BaseAccordionContainer
      :title="findText"
      @open="handleOpen"
      @close="handleClose"
    >
      <BaseTrackSearchContainer
        v-if="isOpen"
        source-id="genius"
        :scope="scope"
        :query="query"
      >
        <template #default="slotProps">
          <LyricsSelect
            :is-loading="slotProps.isLoading"
            :is-error="slotProps.isError"
            :tracks="slotProps[scope]"
          />
        </template>
      </BaseTrackSearchContainer>

      <BaseTrackLyricsContainer
        v-if="selectedTrackData"
        :key="key"
        class="lyrics-data-segment"
        :selected-track-data="selectedTrackData"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <LyricsData
            :lyrics="slotProps.lyrics"
            :track-id="slotProps.trackId"
          />
        </template>
      </BaseTrackLyricsContainer>
    </BaseAccordionContainer>
  </div>
</template>

<script>
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import BaseTrackSearchContainer
  from '*/components/containers/track/BaseTrackSearchContainer.vue'
import LyricsSelect from './LyricsSegment/LyricsSelect.vue'
import BaseTrackLyricsContainer
  from '*/components/containers/track/BaseTrackLyricsContainer.vue'
import LyricsData from './LyricsSegment/LyricsData.vue'
import {
  generateKey
} from '*/helpers/utils'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'LyricsSegment',
  components: {
    BaseAccordionContainer,
    BaseTrackSearchContainer,
    LyricsSelect,
    BaseTrackLyricsContainer,
    LyricsData
  },
  provide () {
    return {
      setSelectedTrackData: this.setSelectedTrackData
    }
  },
  props: {
    query: String
  },
  data () {
    return {
      selectedTrackData: null,
      key: null,
      isOpen: false,
      scope: 'tracks'
    }
  },
  computed: {
    findText () {
      return this.$t(
        'actions.find.lyrics'
      )
    }
  },
  watch: {
    selectedTrackData:
      'handleSelectedTrackDataChange'
  },
  methods: {
    handleOpen () {
      this.isOpen = true

      this.focus()
    },
    handleClose () {
      this.isOpen = false
      this.selectedTrackData = null
    },
    handleSelectedTrackDataChange (
      value
    ) {
      if (value) {
        this.key = generateKey()

        this.focus()
      }
    },
    handleFocus () {
      this.focus()
    },
    setSelectedTrackData (
      value
    ) {
      this.selectedTrackData = value
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.lyrics-data-segment
  @extend .no-padding
</style>
