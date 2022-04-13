<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BasePlaylistCreateFormContainer
        class="main-playlist-form"
        :image="image"
        @success="handleSuccess"
      >
        <div class="fields-container">
          <BaseImageField
            class="image-field"
            model="playlist"
            @change="handleImageChange"
          />

          <div class="fields-right-column">
            <BaseTitleField ref="title" />
          </div>
        </div>

        <div class="submit-button-container">
          <BaseSubmitButton
            action-key="create"
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
import BaseImageField from '*/components/fields/BaseImageField.vue'
import BaseTitleField from '*/components/fields/BaseTitleField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePlaylistCreateModal',
  components: {
    BaseModalContainer,
    BasePlaylistCreateFormContainer,
    BaseImageField,
    BaseTitleField,
    BaseSubmitButton
  },
  data () {
    return {
      image: {}
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
