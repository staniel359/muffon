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
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import { playlistFormOptions } from '*/helpers/data/plugins/semantic'
import createProfilePlaylist from '*/helpers/actions/api/profile/playlist/create'
import {
  playlist as formatProfilePlaylistLink
} from '*/helpers/formatters/links/profile'

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

      this.createProfilePlaylist(
        createArgs
      )
    },
    handlePlaylistIdChange () {
      this.redirect()

      this.$emit(
        'success'
      )
    },
    createProfilePlaylist,
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
