<template>
  <div
    v-if="error"
    class="main-top-section"
  >
    <BaseErrorMessage
      :error="error"
      is-with-refresh-button
      @refresh="handleRefresh"
    />
  </div>

  <BaseProgress
    ref="progress"
    status="get"
    :scope="scope"
    :is-disabled="isProgressDisabled"
    @complete.once="handleProgressComplete"
  />
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseProgress from '@/components/BaseProgress.vue'

import getUserData from '@/helpers/actions/api/user/get'

export default {
  name: 'PlaylistsGetSection',
  components: {
    BaseErrorMessage,
    BaseProgress
  },
  props: {
    source: {
      type: String,
      required: true
    },
    playlistsCount: {
      type: Number,
      required: true
    }
  },
  emits: [
    'complete'
  ],
  data () {
    return {
      scope: 'playlists',
      userData: {},
      error: null,
      page: 1,
      limit: 20,
      playlists: [],
      isComplete: false
    }
  },
  computed: {
    userArgs () {
      return {
        source: this.source,
        scope: this.scope,
        page: this.page,
        limit: this.limit
      }
    },
    isGetNextPageData () {
      return (
        this.page < this.totalPagesCount
      )
    },
    totalPagesCount () {
      return this.userData?.total_pages
    },
    isProgressDisabled () {
      return this.isComplete
    }
  },
  watch: {
    userData: 'handleUserDataChange'
  },
  mounted () {
    this.setProgressTotalCount()

    this.getPlaylistsData()
  },
  methods: {
    getUserData,
    handleUserDataChange (
      value
    ) {
      const {
        playlists
      } = value

      this.playlists = [
        ...this.playlists,
        ...playlists
      ]

      this.setProgressValue(
        this.playlists.length
      )

      if (this.isGetNextPageData) {
        this.page += 1

        this.getPlaylistsData()
      }
    },
    handleProgressComplete () {
      this.setComplete()
    },
    handleRefresh () {
      this.getPlaylistsData()
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.playlistsCount
        )
    },
    getPlaylistsData () {
      this.getUserData(
        this.userArgs
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
    },
    setComplete () {
      this.isComplete = true

      this.$emit(
        'complete',
        {
          playlists: this.playlists
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
