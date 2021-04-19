<template>
  <div
    class="ui modal main-modal"
    ref="modal"
  >
    <div
      class="ui basic segment scrolling content main-segment"
      :class="{ loading: isLoading }"
    >
      <BaseError
        v-if="error"
        :error="error"
        @refresh="handleRefresh"
      />
      <slot v-else-if="responseData"></slot>
    </div>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import { setModal, showModal, hideModal } from '#/actions/plugins/semantic'
import { mainModalOptions } from '#/data/plugins/semantic'
import { remove } from '#/actions/plugins/jquery'

export default {
  name: 'BaseModalContainer',
  components: {
    BaseError
  },
  props: {
    isLoading: Boolean,
    error: Error,
    responseData: Object
  },
  emits: [
    'call',
    'refresh'
  ],
  data () {
    return {
      isCalled: false
    }
  },
  computed: {
    modalOptions () {
      return mainModalOptions({
        onShow: this.handleShow
      })
    }
  },
  watch: {
    isCalled: 'handleCall'
  },
  mounted () {
    setModal(
      this.$refs.modal,
      this.modalOptions
    )
  },
  unmounted () {
    remove(this.$refs.modal)
  },
  methods: {
    handleShow () {
      this.isCalled = true
    },
    handleCall (value) {
      value && this.$emit('call')
    },
    handleRefresh () {
      this.$emit('refresh')
    },
    show () {
      showModal(this.$refs.modal)
    },
    hide () {
      hideModal(this.$refs.modal)
    }
  }
}
</script>

<style lang="sass" scoped>
.main-segment
  max-height: $mainModalHeight !important
</style>
