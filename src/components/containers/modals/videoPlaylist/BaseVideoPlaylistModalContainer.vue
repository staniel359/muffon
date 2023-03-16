<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="playlistData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
  >
    <slot
      :[scope]="playlistData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getVideoPlaylist from '@/helpers/actions/api/videoPlaylist/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseVideoPlaylistModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
  props: {
    playlistId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      playlistData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    videoPlaylistArgs () {
      return {
        playlistId: this.playlistId,
        scope: this.scope
      }
    }
  },
  methods: {
    getVideoPlaylist,
    getData () {
      this.getVideoPlaylist(
        this.videoPlaylistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
