<template>
  <BaseSegmentContainer
    ref="segment"
    class="basic main-segment-container annotation-segment"
    :response-data="annotationData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <p
      v-if="annotationData"
      class="main-text-container"
      v-text="annotationData.text"
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

<style lang="sass" scoped>
.annotation-segment
  @extend .no-padding, .no-margin
</style>
