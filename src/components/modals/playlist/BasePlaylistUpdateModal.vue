<template>
  <BaseModalContainer
    ref="modal"
    is-multiple
    @visible="handleVisible"
  >
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

            <BasePrivateField
              model="playlist"
              :is-checked="isPrivate"
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
  from '@/components/containers/modals/BaseModalContainer.vue'
import BasePlaylistUpdateFormContainer
  from '@/components/containers/forms/playlist/BasePlaylistUpdateFormContainer.vue'
import BaseImageField from '@/components/fields/BaseImageField.vue'
import BaseTitleField from '@/components/fields/BaseTitleField.vue'
import BasePrivateField from '@/components/fields/BasePrivateField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePlaylistUpdateModal',
  components: {
    BaseModalContainer,
    BasePlaylistUpdateFormContainer,
    BaseImageField,
    BaseTitleField,
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
