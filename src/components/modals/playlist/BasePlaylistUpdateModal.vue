<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BasePlaylistUpdateFormContainer
        class="main-playlist-form"
        :playlistId="playlistId"
        :image="image"
        @success="handleSuccess"
      >
        <div class="fields-container">
          <BasePlaylistImageField
            class="image-field"
            :value="imageData?.medium"
            @change="handleImageChange"
          />

          <BasePlaylistTitleField
            ref="title"
            class="title-field"
            :value="playlistTitle"
          />
        </div>

        <div class="submit-button-container">
          <BaseSubmitButton
            actionKey="save"
          />
        </div>
      </BasePlaylistUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import BasePlaylistUpdateFormContainer
  from '@/containers/forms/playlist/BasePlaylistUpdateFormContainer.vue'
import BasePlaylistImageField
  from '@/fields/playlist/BasePlaylistImageField.vue'
import BasePlaylistTitleField
  from '@/fields/playlist/BasePlaylistTitleField.vue'
import BaseSubmitButton from '@/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePlaylistUpdateModal',
  components: {
    BaseModalContainer,
    BasePlaylistUpdateFormContainer,
    BasePlaylistImageField,
    BasePlaylistTitleField,
    BaseSubmitButton
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
    handleSuccess () {
      this.$refs.modal.hide()
    },
    show () {
      this.$refs.modal.show()

      this.$refs.title.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
