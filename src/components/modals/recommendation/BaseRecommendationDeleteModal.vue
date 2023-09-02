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
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deleteRecommendationArtist from
  '@/helpers/actions/api/recommendation/artist/delete'

export default {
  name: 'BaseRecommendationDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    },
    model: {
      type: String,
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
        recommendationId:
          this.recommendationId
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteRecommendationArtist,
    handleDeleteButtonClick () {
      this.deleteRecommendation()
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
    deleteRecommendation () {
      switch (this.model) {
        case 'artist':
          return this.deleteRecommendationArtist(
            this.deleteArgs
          )
        default:
          return null
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
