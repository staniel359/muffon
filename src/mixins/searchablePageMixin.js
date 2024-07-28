import BaseSearchSection from '@/components/sections/BaseSearchSection.vue'

export default {
  components: {
    BaseSearchSection
  },
  props: {
    isWithSearch: Boolean
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    query: 'handleQueryChange'
  },
  methods: {
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
