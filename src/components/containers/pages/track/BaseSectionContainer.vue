<template>
  <div
    class="ui basic segments"
    ref="segment"
  >
    <HeaderSection
      v-if="headerText"
      :headerText="headerText"
      :formatHeaderLink="formatHeaderLink"
      :artistName="artistName"
      :trackTitle="trackTitle"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :trackData="trackData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import HeaderSection from './BaseSectionContainer/HeaderSection.vue'
import fetchTrackData from '#/actions/api/track/fetchData'
import { focusOnSegment } from '#/actions/document'

export default {
  name: 'BaseSectionContainer',
  components: {
    HeaderSection
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    headerText: String,
    formatHeaderLink: Function
  },
  data () {
    return {
      isLoading: false,
      error: null,
      trackData: null
    }
  },
  computed: {
    trackDataArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    fetchTrackData,
    fetchData (page) {
      this.fetchTrackData({
        ...this.trackDataArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(this.$refs.segment)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.main-basic-segment-container
  @extend .flex-full
</style>
