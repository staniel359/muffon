<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BasePlaylistCreateFormContainer
        class="main-playlist-form"
        :image="image"
        @success="handleSuccess"
      >
        <div class="fields-container">
          <BasePlaylistImageField
            class="image-field"
            @change="handleImageChange"
          />

          <BasePlaylistTitleField
            ref="title"
            class="title-field"
          />
        </div>

        <div class="submit-button-container">
          <BaseSubmitButton
            actionKey="create"
          />
        </div>
      </BasePlaylistCreateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BasePlaylistCreateFormContainer
  from '*/components/containers/forms/playlist/BasePlaylistCreateFormContainer.vue'
import BasePlaylistImageField
  from '*/components/fields/playlist/BasePlaylistImageField.vue'
import BasePlaylistTitleField
  from '*/components/fields/playlist/BasePlaylistTitleField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePlaylistCreateModal',
  components: {
    BaseModalContainer,
    BasePlaylistCreateFormContainer,
    BasePlaylistImageField,
    BasePlaylistTitleField,
    BaseSubmitButton
  },
  data () {
    return {
      image: {}
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
