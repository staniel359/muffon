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
import Mousetrap from 'mousetrap'
import SearchInput from './TheSearchModal/SearchInput.vue'
import SearchTabs from './TheSearchModal/SearchTabs.vue'
import { mainModalOptions } from '#/data/plugins/semantic'
import {
  setModal,
  toggleModal,
  hideModal
} from '#/actions/plugins/semantic'
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
      mainModalOptions({
        onVisible: this.focusInput
      })
    )

    this.setKeyBindings()
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
        'main-modal-full-height',
        value.length
      )
    },
    setKeyBindings () {
      Mousetrap.bind('ctrl+f', this.toggle, 'keyup')
      Mousetrap.bind('ctrl+f', this.unfocusInput)
    },
    toggle () {
      toggleModal(this.$refs.modal)
    },
    focusInput () {
      this.$refs.input.focus()
    },
    unfocusInput () {
      this.$refs.input.unfocus()
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
  .content
    @extend .d-flex, .flex-column, .h-100
</style>
