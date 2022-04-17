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
    'success'
  ],
  data () {
    return {
      error: null,
      isLoading: false,
      isSuccess: false
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
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteRecommendation,
    handleDeleteButtonClick () {
      this.deleteRecommendation(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.hide()

        this.$emit(
          'success'
        )
      }
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
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
