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
    :format-active="formatProgressActive"
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
      isProgress: true
    }
  },
  computed: {
    playsCount () {
      return this.userData.plays_count
    },
    playsArgs () {
      return {
        lastfmNickname:
          this.lastfmNickname
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

    this.$refs
      .progress
      .setTotalCount(
        this.playsCount
      )

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
      this.$refs
        .progress
        .setValue(
          value.length
        )

      if (this.isGetPlays) {
        this.page += 1

        this.fetchData()
      }
    },
    handleRefresh () {
      this.fetchData()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false

      this.successTracks =
        formatCollection(
          formatPlaysToTracks(
            this.plays
          )
        )
    },
    fetchData () {
      this.getLastfmUserPlays(
        this.playsArgs
      )
    },
    formatProgressActive (
      {
        value,
        total
      }
    ) {
      return this.$t(
        'import.active.plays',
        {
          value,
          total
        }
      )
    },
    setSuccessTracks (
      value
    ) {
      this.successTracks = value
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-bottom: 1em
</style>
