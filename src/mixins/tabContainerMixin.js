import BasePaginatedTabContainer
  from '@/components/containers/tabs/BasePaginatedTabContainer.vue'

export default {
  components: {
    BasePaginatedTabContainer
  },
  provide () {
    return {
      getData: this.getData
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      error: null,
      isLoading: false
    }
  },
  methods: {
    handleActivate () {
      this.getData()
    },
    handleFocus () {
      this.$emit(
        'focus'
      )
    }
  }
}
