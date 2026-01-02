import {
  set as setCheckbox,
  toggle as toggleCheckbox
} from '@/helpers/actions/plugins/semantic/checkbox'
import {
  main as mainCheckboxOptions
} from '@/helpers/formatters/plugins/semantic/options/checkbox'

export default {
  props: {
    isChecked: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    checkboxOptions () {
      return mainCheckboxOptions(
        {
          onChecked: this.handleChecked,
          onUnchecked: this.handleUnchecked
        }
      )
    }
  },
  mounted () {
    setCheckbox(
      this.$refs.checkbox,
      this.checkboxOptions
    )
  },
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    },
    handleChecked () {
      this.change(
        true
      )
    },
    handleUnchecked () {
      this.change(
        false
      )
    },
    toggle () {
      toggleCheckbox(
        this.$refs.checkbox
      )
    }
  }
}
