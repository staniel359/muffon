<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
    is-with-refresh-button
    @refresh="handleRefresh"
  />

  <BaseProgress
    v-show="isProgress"
    ref="progress"
    :status="status"
    :scope="scope"
    @complete="handleProgressComplete"
  />

  <CompleteSection
    v-if="isComplete"
    :success-tracks="successTracks"
    :error="error"
  />
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './ImportSection/CompleteSection.vue'
import getLastfmUserPlays from '*/helpers/actions/api/lastfm/user/plays/get'
import {
  collection as formatCollection,
  playsToTracks as formatPlaysToTracks
} from '*/helpers/formatters'

export default {
  name: 'ImportSection',
  components: {
    BaseErrorMessage,
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setSuccessTracks: this.setSuccessTracks
    }
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: null,
      totalPagesCount: null,
      page: 1,
      plays: [],
      successTracks: [],
      isComplete: false,
      isMounted: false,
      isProgress: true,
      status: 'import',
      scope: 'plays'
    }
  },
  computed: {
    playsCount () {
      return this.userData.plays_count
    },
    playsArgs () {
      return {
        lastfmNickname:
          this.lastfmNickname,
        page: this.page
      }
    },
    lastfmNickname () {
      return this.userData.nickname
    },
    isGetPlays () {
      return (
        this.isMounted && (
          this.page <
            this.totalPagesCount
        )
      )
    }
  },
  watch: {
    plays: 'handlePlaysChange'
  },
  mounted () {
    this.isMounted = true

    this.setProgressTotalCount()

    this.fetchData()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  methods: {
    getLastfmUserPlays,
    handlePlaysChange (
      value
    ) {
      this.setProgressValue(
        value.length
      )

      if (this.isGetPlays) {
        this.page += 1

        this.fetchData()
      } else {
        const tracks =
          formatPlaysToTracks(
            this.plays
          )

        const tracksFormatted =
          formatCollection(
            tracks
          )

        this.setSuccessTracks(
          tracksFormatted
        )
      }
    },
    handleRefresh () {
      this.fetchData()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    fetchData () {
      this.getLastfmUserPlays(
        this.playsArgs
      )
    },
    setSuccessTracks (
      value
    ) {
      this.successTracks = value
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.playsCount
        )
    },
    setProgressValue (
      value
    ) {
      this.$refs
        .progress
        .setValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-bottom: 1em
</style>
