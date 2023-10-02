<template>
  <BaseDeleteModal
    ref="modal"
    model-type="recommendationModel"
    :model="model"
    :model-name="modelName"
    :is-loading="isLoading"
    :error="error"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deleteRecommendation from
  '@/helpers/actions/api/recommendation/model/delete'

export default {
  name: 'BaseRecommendationDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    modelData: {
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
    modelName () {
      switch (this.model) {
        case 'artist':
          return this.modelData.name
        case 'track' :
          return [
            this.modelData.artist.name,
            this.modelData.title
          ].join(
            ' - '
          )
        default:
          return null
      }
    },
    recommendationId () {
      return this.modelData.id
    },
    deleteArgs () {
      return {
        model: this.model,
        recommendationId:
          this.recommendationId
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

<style lang="sass" scoped></style>
