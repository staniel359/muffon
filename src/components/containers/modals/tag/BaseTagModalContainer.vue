<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="tagData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
  >
    <slot
      :[scope]="tagData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getTag from '@/helpers/actions/api/tag/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseTagModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
  props: {
    tagName: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tagData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope
      }
    }
  },
  methods: {
    getTag,
    getData () {
      this.getTag(
        this.tagArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
