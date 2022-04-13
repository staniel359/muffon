<template>
  <BaseDeleteModal
    ref="modal"
    model-type="recommendation"
    :model-name="artistName"
    :is-loading="isLoading"
    :error="error"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '*/components/modals/BaseDeleteModal.vue'
import deleteRecommendation from '*/helpers/actions/api/recommendation/delete'

export default {
  name: 'BaseRecommendationDeleteModal',
  components: {
    BaseDeleteModal
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
    handleDeleteButtonClick () {
      this.deleteRecommendation(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs
        .modal
        .hide()

      this.$emit(
        'deleted'
      )
    },
    deleteRecommendation,
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
