<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BasePlaylistEditFormContainer
        class="main-playlist-form"
        :playlistId="playlistId"
        :image="image"
      >
        <div class="fields-container">
          <BasePlaylistImageField
            class="image-field"
            :value="imageData.original"
            @change="handleImageChange"
          />

          <BasePlaylistTitleField
            ref="title"
            class="title-field"
            :value="playlistTitle"
          />
        </div>

        <SubmitButton />
      </BasePlaylistEditFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import BasePlaylistEditFormContainer
  from '@/containers/forms/playlist/BasePlaylistEditFormContainer.vue'
import BasePlaylistImageField
  from '@/fields/playlist/BasePlaylistImageField.vue'
import BasePlaylistTitleField
  from '@/fields/playlist/BasePlaylistTitleField.vue'
import SubmitButton from './BasePlaylistEditModal/SubmitButton.vue'

export default {
  name: 'BasePlaylistEditModal',
  components: {
    BaseModalContainer,
    BasePlaylistEditFormContainer,
    BasePlaylistImageField,
    BasePlaylistTitleField,
    SubmitButton
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      image: {}
    }
  },
  computed: {
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
    handleImageChange (value) {
      this.image = value
    },
    show () {
      this.$refs.modal.show()

      this.$refs.title.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
