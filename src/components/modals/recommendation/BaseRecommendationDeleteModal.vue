<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerFormatted }}
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
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import TextSection from './BaseRecommendationDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deleteRecommendationData from '#/actions/api/recommendation/deleteData'

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
    headerFormatted () {
      return this.$t(
        'shared.recommendation.delete.header'
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
    artistName () {
      return this.recommendationData.name
    },
    recommendationId () {
      return this.recommendationData.id
    }
  },
  methods: {
    deleteRecommendationData,
    handleDeleteButtonClick () {
      this.deleteRecommendationData({
        recommendationId: this.recommendationId
      }).then(this.handleSuccess)
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
