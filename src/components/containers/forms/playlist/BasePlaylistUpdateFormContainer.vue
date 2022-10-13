<template>
  <BaseFormContainer
    ref="form"
    :options="options"
    :is-loading="isLoading"
    :error="error"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '@/components/containers/forms/BaseFormContainer.vue'
import {
  playlistFormOptions
} from '@/helpers/data/plugins/semantic'
import updatePlaylist from '@/helpers/actions/api/playlist/update'
import {
  setToast
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'BasePlaylistUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  inject: [
    'setPlaylistData'
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
      playlistData: null,
      error: null,
      isLoading: false,
      fields: [
        'title'
      ]
    }
  },
  computed: {
    options () {
      return playlistFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    },
    updatedMessage () {
      return this.$t(
        'notifications.updated.playlist',
        {
          playlistTitle:
            this.playlistTitleStrong
        }
      )
    },
    playlistTitleStrong () {
      return `<strong>${this.playlistTitle}</strong>`
    },
    playlistTitle () {
      return this.playlistData.title
    }
  },
  watch: {
    playlistData: 'handlePlaylistDataChange'
  },
  methods: {
    updatePlaylist,
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
    handlePlaylistDataChange (
      value
    ) {
      if (value) {
        this.setPlaylistData(
          value
        )

        this.$emit(
          'success'
        )

        this.notify()
      }
    },
    formatUpdateArgs (
      fields
    ) {
      const {
        title
      } = fields

      const image = this.image.data

      return {
        playlistId:
          this.playlistId,
        title,
        image,
        isPrivate:
          fields.private
      }
    },
    notify () {
      setToast(
        {
          message: this.updatedMessage,
          icon: 'green check'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
