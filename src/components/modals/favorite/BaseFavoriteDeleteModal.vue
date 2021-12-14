<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerText }}
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
          :text="cancelText"
        />

        <BaseButton
          class="red"
          :text="deleteText"
          :class="{ loading: isLoading }"
          @click="handleDeleteButtonClick"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import TextSection from './BaseFavoriteDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deleteFavoriteData from '#/actions/api/favorites/model/deleteData'

export default {
  name: 'BaseFavoriteDeleteModal',
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
    headerText () {
      return this.$t(
        'shared.favorite.delete.header'
      )
    },
    cancelText () {
      return this.$t(
        'buttons.cancel'
      )
    },
    deleteText () {
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
    favoriteId () {
      return this.modelData.id
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deleteFavoriteData({
        model: this.model,
        favoriteId: this.favoriteId
      }).then(this.handleSuccess)
    },
    handleSuccess () {
      this.$refs.modal.hide()

      this.$emit('deleted')
    },
    deleteFavoriteData,
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
