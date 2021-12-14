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
import fetchPlaylistEditData from '#/actions/api/playlist/edit/fetchData'

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
