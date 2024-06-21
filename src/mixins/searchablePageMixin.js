import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import BasePageSearchInput
  from '@/components/inputs/BasePageSearchInput.vue'

export default {
  components: {
    BaseSearchButton,
    BasePageSearchInput
  },
  props: {
    isWithSearch: Boolean
  },
  data () {
    return {
      isShowSearch: false,
      query: ''
    }
  },
  computed: {
    isSearchWithClearButton () {
      return !!this.query.length
    }
  },
  watch: {
    query: 'handleQueryChange'
  },
  methods: {
    handleSearchButtonClick () {
      this.isShowSearch =
        !this.isShowSearch
    },
    handleSearchSubmit (
      value
    ) {
      this.query = value
    },
    handleSearchClearButtonClick () {
      this.query = ''
    },
    async handleQueryChange () {
      await this.$nextTick()

      this.refresh()
    }
  }
}
