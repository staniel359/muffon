<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-popup-content-container"
    :response-data="annotationData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <p
      v-if="annotationData"
      class="main-formatted-text-container"
      v-html="annotationTextFormatted"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import getAnnotation from '@/helpers/actions/api/annotation/get'

export default {
  name: 'BaseAnnotationPopup',
  components: {
    BaseSegmentContainer
  },
  props: {
    annotationId: {
      type: String,
      required: true
    },
    isCalled: Boolean
  },
  emits: [
    'annotationDataChange'
  ],
  data () {
    return {
      annotationData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    annotationArgs () {
      return {
        annotationId: this.annotationId
      }
    },
    annotationTextFormatted () {
      return this.annotationText.replaceAll(
        '<a href',
        '<a class="main-link bold" target="_blank" href'
      )
    },
    annotationText () {
      return this.annotationData.text
    }
  },
  watch: {
    isCalled: 'handleIsCalledChange',
    annotationData:
      'handleAnnotationDataChange'
  },
  methods: {
    getAnnotation,
    handleIsCalledChange (
      value
    ) {
      if (value) {
        this.getData()
      }
    },
    handleAnnotationDataChange (
      value
    ) {
      this.$emit(
        'annotationDataChange'
      )
    },
    handleRefresh () {
      this.getData()
    },
    getData () {
      this.getAnnotation(
        this.annotationArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
