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
            :value="imageData.original"
            @change="handleImageChange"
          />

          <BaseTitleField
            ref="title"
            class="title-field"
            :value="playlistTitle"
          />
        </div>

        <SubmitButton />
      </BaseFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import BaseImageField from '@/models/playlist/fields/BaseImageField.vue'
import BaseTitleField from '@/models/playlist/fields/BaseTitleField.vue'
import SubmitButton from './BasePlaylistEditModal/SubmitButton.vue'
import { playlistFormOptions } from '#/data/plugins/semantic'
import fetchPlaylistEditData
  from '#/actions/api/profile/playlists/playlist/edit/fetchData'

export default {
  name: 'BasePlaylistEditModal',
  components: {
    BaseModalContainer,
    BaseFormContainer,
    BaseImageField,
    BaseTitleField,
    SubmitButton
  },
  inject: [
    'setProfileData'
  ],
  props: {
    playlistData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: null,
      form: null,
      image: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return playlistFormOptions({
        onSuccess: this.handleSuccess
      })
    },
    playlistId () {
      return this.playlistData.id.toString()
    },
    playlistTitle () {
      return this.playlistData.title
    },
    imageData () {
      return this.playlistData.image
    }
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

      this.fetchPlaylistEditData(
        this.formatPlaylistParams(
          fields
        )
      )
    },
    fetchPlaylistEditData,
    show () {
      this.$refs.modal.show()

      this.$refs.title.focus()
    },
    formatPlaylistParams (fields) {
      return {
        playlistId: this.playlistId,
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
