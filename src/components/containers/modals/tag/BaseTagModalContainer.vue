<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="tagData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <slot
      :[scope]="tagData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '*/components/containers/modals/BaseSegmentModalContainer.vue'
import getTag from '*/helpers/actions/api/tag/get'

export default {
  name: 'BaseTagModalContainer',
  components: {
    BaseSegmentModalContainer
  },
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
      isLoading: false,
      error: null,
      tagData: null
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
    handleCall () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    fetchData () {
      this.getTag(
        this.tagArgs
      )
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
