<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerFormatted }}
      </div>

      <div class="content">
        <TextSection
          :modelName="modelName"
        />

        <BaseErrorMessage
          v-if="error"
          class="error-message"
          :error="error"
        />
      </div>

      <div class="actions">
        <BaseButton
          class="cancel"
          :text="cancelFormatted"
        />

        <BaseButton
          class="red"
          :text="deleteFormatted"
          :class="{ loading: isLoading }"
          @click="handleDeleteButtonClick"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import TextSection from './BaseBookmarkDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deleteBookmarkData
  from '#/actions/api/profile/bookmarks/model/deleteData'

export default {
  name: 'BaseBookmarkDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseErrorMessage,
    BaseButton
  },
  props: {
    model: {
      type: String,
      required: true
    },
    modelData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'deleted'
  ],
  data () {
    return {
      error: null,
      isLoading: false
    }
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'shared.bookmark.delete.header'
      )
    },
    cancelFormatted () {
      return this.$t(
        'buttons.cancel'
      )
    },
    deleteFormatted () {
      return this.$t(
        'buttons.delete'
      )
    },
    modelName () {
      switch (this.model) {
        case 'artist':
          return this.modelData.name
        default:
          return [
            this.modelData.artist.name,
            this.modelData.title
          ].join(' - ')
      }
    },
    bookmarkId () {
      return this.modelData.id
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deleteBookmarkData({
        model: this.model,
        bookmarkId: this.bookmarkId
      }).then(this.handleSuccess)
    },
    handleSuccess () {
      this.$refs.modal.hide()

      this.$emit('deleted')
    },
    deleteBookmarkData,
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
