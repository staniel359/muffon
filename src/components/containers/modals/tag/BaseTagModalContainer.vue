<template>
  <BaseModalContentContainer
    ref="modal"
    :isLoading="isLoading"
    :error="error"
    :responseData="tagData"
    @call="handleModalCall"
    @refresh="handleModalRefresh"
  >
    <template #default>
      <slot :[scope]="tagData[scope]"></slot>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '*/components/containers/modals/BaseModalContentContainer.vue'
import getTag from '*/helpers/actions/api/tag/get'

export default {
  name: 'BaseTagModalContainer',
  components: {
    BaseModalContentContainer
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
    handleModalCall () {
      this.fetchData()
    },
    handleModalRefresh () {
      this.fetchData()
    },
    getTag,
    fetchData () {
      this.getTag(
        this.tagArgs
      )
    },
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
