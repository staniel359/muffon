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
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseFormContainer
  from '@/components/containers/forms/BaseFormContainer.vue'
import playlistFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/playlist'
import createPlaylist from '@/helpers/actions/api/playlist/create'
import {
  playlist as formatProfilePlaylistLink
} from '@/helpers/formatters/links/profile'

export default {
  name: 'BasePlaylistCreateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    image: Object,
    isWithRedirect: Boolean
  },
  emits: [
    'success'
  ],
  data () {
    return {
      playlistId: null,
      error: null,
      isLoading: false,
      fields: [
        'title',
        'description'
      ]
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    options () {
      return playlistFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    },
    playlistUrl () {
      return formatProfilePlaylistLink(
        {
          profileId: this.profileId,
          playlistId: this.playlistId
        }
      )
    }
  },
  watch: {
    playlistId: 'handlePlaylistIdChange'
  },
  methods: {
    createPlaylist,
    handleSuccess (
      event,
      fields
    ) {
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
      if (this.isWithRedirect) {
        this.redirect()
      }

      this.$emit(
        'success'
      )
    },
    redirect () {
      this.$router.push(
        this.playlistUrl
      )
    },
    formatCreateArgs (
      fields
    ) {
      const {
        title,
        description
      } = fields

      const image = this.image.data

      return {
        title,
        description,
        image,
        isPrivate: fields.private,
        isForm: true
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
