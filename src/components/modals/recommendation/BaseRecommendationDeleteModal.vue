<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerText }}
      </div>

      <div class="content">
        <TextSection
          :artistName="artistName"
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
import TextSection from './BaseRecommendationDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deleteRecommendation from '#/actions/api/recommendation/delete'

export default {
  name: 'BaseRecommendationDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseErrorMessage,
    BaseButton
  },
  props: {
    recommendationData: {
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
        'shared.recommendation.delete.header'
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
    artistName () {
      return this.recommendationData.name
    },
    recommendationId () {
      return this.recommendationData.id
    },
    deleteArgs () {
      return {
        recommendationId: this.recommendationId
      }
    }
  },
  methods: {
    deleteRecommendation,
    handleDeleteButtonClick () {
      this.deleteRecommendation(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs.modal.hide()

      this.$emit('deleted')
    },
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
