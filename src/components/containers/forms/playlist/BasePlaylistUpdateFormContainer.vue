<template>
  <BaseFormContainer
    :options="options"
    :is-loading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import {
  playlistFormOptions
} from '*/helpers/data/plugins/semantic'
import updatePlaylist from '*/helpers/actions/api/playlist/update'

export default {
  name: 'BasePlaylistUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  inject: [
    'setProfileData'
  ],
  props: {
    playlistId: {
      type: String,
      required: true
    },
    image: Object
  },
  emits: [
    'success'
  ],
  data () {
    return {
      form: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return playlistFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    }
  },
  methods: {
    handleInit (
      element
    ) {
      this.form = element
    },
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const updateArgs =
        this.formatUpdateArgs(
          fields
        )

      this.updatePlaylist(
        updateArgs
      )
    },
    updatePlaylist,
    formatUpdateArgs (
      fields
    ) {
      const {
        title
      } = fields

      const image = this.image.data

      return {
        playlistId: this.playlistId,
        title,
        image
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
