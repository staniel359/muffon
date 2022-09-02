<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
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
            <BaseTitleField
              ref="title"
            />

            <BasePrivateField
              model="playlist"
            />
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
import BasePrivateField from '*/components/fields/BasePrivateField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePlaylistCreateModal',
  components: {
    BaseModalContainer,
    BasePlaylistCreateFormContainer,
    BaseImageField,
    BaseTitleField,
    BasePrivateField,
    BaseSubmitButton
  },
  data () {
    return {
      image: {}
    }
  },
  methods: {
    handleVisible () {
      this.focusTitle()
    },
    handleImageChange (
      value
    ) {
      this.image = value
    },
    handleSuccess () {
      this.hide()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    focusTitle () {
      this.$refs
        .title
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
