<template>
  <BaseModalContainer
    ref="modal"
    is-multiple
    @visible="handleVisible"
  >
    <div class="content">
      <BasePlaylistUpdateFormContainer
        :playlist-id="playlistId"
        :image="image"
        @success="handleSuccess"
      >
        <div class="main-form-extra-section">
          <BaseImageField
            class="main-form-image-field"
            model="playlist"
            :value="imageData?.medium"
            @change="handleImageChange"
          />

          <div class="main-form-extra-section-fields-section">
            <BaseTitleField
              ref="title"
              :value="playlistTitle"
            />

            <BaseDescriptionField
              :value="description"
              @submit="handleSubmit"
            />

            <BasePrivateField
              model="playlist"
              :is-checked="isPrivate"
            />
          </div>
        </div>

        <div class="main-form-submit-button-container">
          <BaseSubmitButton
            ref="submit"
            action-key="save"
          />
        </div>
      </BasePlaylistUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BasePlaylistUpdateFormContainer
  from '@/components/containers/forms/playlist/BasePlaylistUpdateFormContainer.vue'
import BaseImageField from '@/components/fields/BaseImageField.vue'
import BaseTitleField from '@/components/fields/BaseTitleField.vue'
import BaseDescriptionField from '@/components/fields/BaseDescriptionField.vue'
import BasePrivateField from '@/components/fields/BasePrivateField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePlaylistUpdateModal',
  components: {
    BaseModalContainer,
    BasePlaylistUpdateFormContainer,
    BaseImageField,
    BaseTitleField,
    BaseDescriptionField,
    BasePrivateField,
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
    },
    isPrivate () {
      return this.playlistData.private
    },
    description () {
      return this.playlistData.description
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
    handleSubmit () {
      this.clickSubmit()
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
    },
    clickSubmit () {
      this.$refs
        .submit
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
