<template>
  <div
    class="ui basic segments"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :headerTextKey="headerTextKey"
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
      :profileId="profileId"
    ></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderSegment from './BaseTrackSegmentContainer/HeaderSegment.vue'
import fetchTrackData from '#/actions/api/track/fetchData'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'BaseTrackSegmentContainer',
  components: {
    HeaderSegment
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
    headerTextKey: String,
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    trackDataArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        scope: this.scope,
        profileId: this.profileId,
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
        focusOnSegment(
          this.$refs.segment
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
