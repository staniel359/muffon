<template>
  <BaseSegmentContainer
    ref="segment"
    :isLoading="isLoading"
  >
    <slot
      :isLoading="isLoading"
      :error="error"
      :playlistData="playlistData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import getPlaylist from '*/helpers/actions/api/playlist/get'

export default {
  name: 'BasePlaylistSegmentContainer',
  components: {
    BaseSegmentContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    playlistId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number
  },
  data () {
    return {
      isLoading: false,
      error: null,
      profileData: null
    }
  },
  computed: {
    playlistArgs () {
      return {
        profileId: this.profileId,
        playlistId: this.playlistId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    },
    playlistData () {
      return this.profileData?.playlist
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getPlaylist,
    fetchData (page) {
      this.getPlaylist({
        ...this.playlistArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        this.$refs.segment.focus()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
