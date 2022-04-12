<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :artistData="artistData"
      :profileId="profileId"
      :topTrackCount="topTrackCount"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :refresh="refresh"
    ></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getArtist from '*/helpers/actions/api/artist/get'
import { focusOnSegment } from '*/helpers/actions/layout'

export default {
  name: 'BaseArtistSegmentContainer',
  components: {
    BaseHeaderSegment
  },
  props: {
    artistName: {
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
      artistData: null,
      topTrackCount: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    artistArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getArtist,
    fetchData (page) {
      this.getArtist({
        ...this.artistArgs,
        page
      })
    },
    refresh (page) {
      this.fetchData(page)
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
