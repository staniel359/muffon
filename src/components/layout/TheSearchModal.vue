<template>
  <div
    class="ui modal main-modal"
    ref="modal"
  >
    <div class="content">
      <SearchInput
        ref="input"
        :isClearable="isClearable"
        @submit="handleSubmit"
        @clear="handleClear"
      />
      <SearchTabs
        v-if="query"
        :query="query"
        :searchKey="key"
      />
    </div>
  </div>
</template>

<script>
import SearchInput from './TheSearchModal/SearchInput.vue'
import SearchTabs from './TheSearchModal/SearchTabs.vue'
import {
  setModal,
  toggleModal,
  hideModal
} from '#/actions/plugins/semantic'
import { mainModalOptions } from '#/data/plugins/semantic'
import { toggleClass } from '#/actions/plugins/jquery'
import { generateKey } from '#/utils'

export default {
  name: 'TheSearchModal',
  components: {
    SearchInput,
    SearchTabs
  },
  provide () {
    return {
      hideSearch: this.hideSearch
    }
  },
  data () {
    return {
      query: '',
      key: null
    }
  },
  computed: {
    isClearable () {
      return !!this.query.length
    }
  },
  watch: {
    query: 'handleQueryChange'
  },
  mounted () {
    setModal(
      this.$refs.modal,
      mainModalOptions()
    )
  },
  methods: {
    handleSubmit (value) {
      this.query = value
      this.key = generateKey()
    },
    handleClear () {
      this.query = ''
    },
    handleQueryChange (value) {
      toggleClass(
        this.$refs.modal,
        'modal-full-height',
        value.length
      )
    },
    toggle () {
      toggleModal(this.$refs.modal)
    },
    unfocusInput () {
      this.$refs.input.unfocusInput()
    },
    hideSearch () {
      hideModal(this.$refs.modal)
    }
  }
}
</script>

<style lang="sass" scoped>
.main-modal
  top: calc((100vh - #{$mainModalHeight}) / 2)

.modal-full-height
  height: $mainModalHeight

.content
  @extend .d-flex, .flex-column, .h-100
</style>
