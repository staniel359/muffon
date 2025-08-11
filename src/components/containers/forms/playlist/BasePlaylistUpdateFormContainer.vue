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
import playlistFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/playlist'
import updatePlaylist from '@/helpers/actions/api/playlist/update'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'BasePlaylistUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  mixins: [
    notificationMixin
  ],
  inject: [
    'setPlaylistData'
  ],
  props: {
    playlistId: {
      type: Number,
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
        'title',
        'description'
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
    notificationSuccessMessage () {
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

        this.notifySuccess()
      }
    },
    formatUpdateArgs (
      fields
    ) {
      const {
        title,
        description
      } = fields

      const image = this.image?.data

      return {
        playlistId: this.playlistId,
        title,
        description,
        image,
        isPrivate: fields.private
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
