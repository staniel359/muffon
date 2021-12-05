<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BasePlaylistCreateContainer
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

        <SubmitButton />
      </BasePlaylistCreateContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import BasePlaylistCreateContainer
  from '@/containers/playlist/BasePlaylistCreateContainer.vue'
import BasePlaylistImageField
  from '@/models/playlist/fields/BasePlaylistImageField.vue'
import BasePlaylistTitleField
  from '@/models/playlist/fields/BasePlaylistTitleField.vue'
import SubmitButton from './BasePlaylistCreateModal/SubmitButton.vue'

export default {
  name: 'BasePlaylistCreateModal',
  components: {
    BaseModalContainer,
    BasePlaylistCreateContainer,
    BasePlaylistImageField,
    BasePlaylistTitleField,
    SubmitButton
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
