<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot></slot>
  </BaseFormContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseFormContainer from '@/containers/forms/BaseFormContainer.vue'
import { playlistFormOptions } from '#/data/plugins/semantic'
import createPlaylist from '#/actions/api/playlist/create'
import {
  playlist as formatProfilePlaylistLink
} from '#/formatters/links/profile'

export default {
  name: 'BasePlaylistCreateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    image: Object
  },
  emits: [
    'success'
  ],
  data () {
    return {
      form: null,
      error: null,
      playlistId: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    options () {
      return playlistFormOptions({
        onSuccess: this.handleSuccess
      })
    },
    playlistUrl () {
      return formatProfilePlaylistLink({
        profileId: this.profileId,
        playlistId: this.playlistId
      })
    },
    profileId () {
      return this.profileInfo.id.toString()
    }
  },
  watch: {
    playlistId: 'handlePlaylistIdChange'
  },
  methods: {
    handleInit (el) {
      this.form = el
    },
    handleSuccess (event, fields) {
      event.preventDefault()

      const createArgs =
        this.formatCreateArgs(
          fields
        )

      this.createPlaylist(
        createArgs
      )
    },
    handlePlaylistIdChange () {
      this.redirect()

      this.$emit(
        'success'
      )
    },
    createPlaylist,
    redirect () {
      this.$router.push(
        this.playlistUrl
      )
    },
    formatCreateArgs (fields) {
      const { title } = fields

      const image = this.image.data

      return {
        title,
        image
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
