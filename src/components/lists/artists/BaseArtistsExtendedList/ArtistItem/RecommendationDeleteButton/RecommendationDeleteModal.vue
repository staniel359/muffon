<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerFormatted }}
      </div>

      <div class="content">
        <RecommendationDeleteTextSection
          :artistName="artistName"
        />

        <BaseError
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
import RecommendationDeleteTextSection
  from './RecommendationDeleteModal/RecommendationDeleteTextSection.vue'
import BaseError from '@/BaseError.vue'
import BaseButton from '@/BaseButton.vue'
import deleteRecommendationData from '#/actions/api/recommendation/deleteData'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'RecommendationDeleteModal',
  components: {
    BaseModalContainer,
    RecommendationDeleteTextSection,
    BaseError,
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
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    headerFormatted () {
      return localize(
        'shared.recommendation.delete.header'
      )
    },
    cancelFormatted () {
      return localize(
        'shared.buttons.cancel'
      )
    },
    deleteFormatted () {
      return localize(
        'shared.buttons.delete'
      )
    },
    artistName () {
      return this.recommendationData.name
    },
    recommendationId () {
      return this.recommendationData.id
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteRecommendationData,
    handleDeleteButtonClick () {
      this.deleteRecommendationData({
        recommendationId: this.recommendationId
      })
    },
    handleIsSuccessChange () {
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
