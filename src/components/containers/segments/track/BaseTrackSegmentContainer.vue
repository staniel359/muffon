<template>
  <div
    ref="segment"
    class="ui basic segments"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :track-data="trackData"
      :profile-id="profileId"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getTrack from '*/helpers/actions/api/track/get'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'BaseTrackSegmentContainer',
  components: {
    BaseHeaderSegment
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
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      isLoading: false,
      error: null,
      trackData: null
    }
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    profileId () {
      return this.profileInfo.id.toString()
    },
    trackArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getTrack,
    fetchData (
      page
    ) {
      this.getTrack(
        {
          ...this.trackArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
