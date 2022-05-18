<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
    is-with-refresh-button
    @refresh="handleRefresh"
  />

  <BaseProgress
    v-if="isShowProgress"
    ref="progress"
    status="import"
    scope="plays"
    @complete="handleProgressComplete"
  />
  <BaseImportCompleteSection
    v-else
    scope="tracks"
    :success-collection="successTracks"
  />
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import BaseProgress from '*/components/BaseProgress.vue'
import BaseImportCompleteSection
  from '*/components/import/BaseImportCompleteSection.vue'
import getLastfmUserPlays from '*/helpers/actions/api/lastfm/user/plays/get'
import {
  playsToTracks as formatPlaysToTracks
} from '*/helpers/formatters'
import collectionMixin from '*/mixins/collectionMixin'

export default {
  name: 'ImportSection',
  components: {
    BaseErrorMessage,
    BaseProgress,
    BaseImportCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      totalPagesCount: null,
      error: null,
      page: 1,
      isProgress: true,
      isComplete: false,
      plays: [],
      successTracks: []
    }
  },
  computed: {
    isShowProgress () {
      return (
        this.isProgress ||
          !this.isComplete
      )
    },
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
        this.page <
          this.totalPagesCount
      )
    }
  },
  watch: {
    plays: 'handlePlaysChange'
  },
  mounted () {
    this.processPlays()
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

        this.getData()
      } else {
        this.successTracks =
          formatPlaysToTracks(
            this.plays
          )

        this.isComplete = true
      }
    },
    handleRefresh () {
      this.getData()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    processPlays () {
      this.setProgressTotalCount()

      this.getData()
    },
    getData () {
      this.getLastfmUserPlays(
        this.playsArgs
      )
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
