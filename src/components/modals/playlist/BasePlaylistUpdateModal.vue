<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BasePlaylistUpdateFormContainer
        class="main-playlist-form"
        :playlist-id="playlistId"
        :image="image"
        @success="handleSuccess"
      >
        <div class="fields-container">
          <BaseImageField
            class="image-field"
            model="playlist"
            :value="imageData?.medium"
            @change="handleImageChange"
          />

          <div class="fields-right-column">
            <BaseTitleField
              ref="title"
              :value="playlistTitle"
            />
          </div>
        </div>

        <div class="submit-button-container">
          <BaseSubmitButton
            action-key="save"
          />
        </div>
      </BasePlaylistUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BasePlaylistUpdateFormContainer
  from '*/components/containers/forms/playlist/BasePlaylistUpdateFormContainer.vue'
import BaseImageField from '*/components/fields/BaseImageField.vue'
import BaseTitleField from '*/components/fields/BaseTitleField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePlaylistUpdateModal',
  components: {
    BaseModalContainer,
    BasePlaylistUpdateFormContainer,
    BaseImageField,
    BaseTitleField,
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
    handleImageChange (
      value
    ) {
      this.image = value
    },
    handleSuccess () {
      this.$refs
        .modal
        .hide()
    },
    show () {
      this.$refs
        .modal
        .show()

      this.$refs
        .title
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
