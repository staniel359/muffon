<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BaseFormContainer
        :options="options"
        :isLoading="isLoading"
        :error="error"
        @init="handleInit"
      >
        <div class="fields-container">
          <BaseImageField
            class="image-field"
            @change="handleImageChange"
          />

          <BaseTitleField
            ref="title"
            class="title-field"
          />
        </div>

        <SubmitButton />
      </BaseFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import BaseImageField from '@/models/playlist/fields/BaseImageField.vue'
import BaseTitleField from '@/models/playlist/fields/BaseTitleField.vue'
import SubmitButton from './CreateModal/SubmitButton.vue'
import { playlistFormOptions } from '#/data/plugins/semantic'
import fetchPlaylistCreateData
  from '#/actions/api/profile/playlists/create/fetchData'
import {
  playlist as formatProfilePlaylistLink
} from '#/formatters/links/profile'

export default {
  name: 'CreateModal',
  components: {
    BaseModalContainer,
    BaseFormContainer,
    BaseImageField,
    BaseTitleField,
    SubmitButton
  },
  data () {
    return {
      error: null,
      form: null,
      image: null,
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
    handleImageChange (value) {
      this.image = value
    },
    handleSuccess (event, fields) {
      event.preventDefault()

      this.fetchPlaylistCreateData(
        this.formatPlaylistParams(
          fields
        )
      )
    },
    handlePlaylistIdChange (value) {
      this.$refs.modal.hide()

      this.$router.push(
        this.playlistUrl
      )
    },
    fetchPlaylistCreateData,
    show () {
      this.$refs.modal.show()

      this.$refs.title.focus()
    },
    formatPlaylistParams (fields) {
      return {
        title: fields.title,
        image: this.image
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.fields-container
  @extend .d-flex

.image-field
  width: 120px
  margin-right: 1em !important

.title-field
  @extend .flex-full
</style>
