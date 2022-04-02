<template>
  <div
    class="ui basic segments"
    ref="segment"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
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
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getTrack from '*/helpers/actions/api/track/get'
import { focusOnSegment } from '*/helpers/actions/layout'

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
    responsePageLimit: Number,
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    trackArgs () {
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
      this.fetchData(page)
    },
    getTrack,
    fetchData (page) {
      this.getTrack({
        ...this.trackArgs,
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
