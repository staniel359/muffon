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
import BaseFormContainer from '@/containers/forms/BaseFormContainer.vue'
import { playlistFormOptions } from '#/data/plugins/semantic'
import fetchPlaylistEditData
  from '#/actions/api/profile/playlist/edit/fetchData'

export default {
  name: 'BasePlaylistEditFormContainer',
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
  data () {
    return {
      form: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return playlistFormOptions({
        onSuccess: this.handleSuccess
      })
    }
  },
  methods: {
    handleInit (el) {
      this.form = el
    },
    handleSuccess (event, fields) {
      event.preventDefault()

      const editDataArgs = this.formatPlaylistParams(
        fields
      )

      this.fetchPlaylistEditData(
        editDataArgs
      )
    },
    fetchPlaylistEditData,
    formatPlaylistParams (fields) {
      const { title } = fields

      const imageFormatted = this.image.data

      return {
        playlistId: this.playlistId,
        title: title,
        image: imageFormatted
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
