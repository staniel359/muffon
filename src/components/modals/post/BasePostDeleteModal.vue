<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerText }}
      </div>

      <div class="content">
        <TextSection />

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
import TextSection from './BasePostDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deletePostData from '#/actions/api/post/deleteData'

export default {
  name: 'BasePostDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseErrorMessage,
    BaseButton
  },
  props: {
    postData: {
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
        'shared.post.delete.header'
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
    postId () {
      return this.postData.id
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deletePostData({
        postId: this.postId
      }).then(this.handleSuccess)
    },
    handleSuccess () {
      this.$refs.modal.hide()

      this.$emit('deleted')
    },
    deletePostData,
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
