import {
  set as setCheckbox
} from '@/helpers/actions/plugins/semantic/checkbox'
import {
  main as mainCheckboxOptions
} from '@/helpers/formatters/plugins/semantic/options/checkbox'

export default {
  props: {
    isChecked: Boolean
  },
  computed: {
    checkboxOptions () {
      return mainCheckboxOptions(
        {
          onChecked:
            this.handleChecked,
          onUnchecked:
            this.handleUnchecked
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
    handleChecked () {
      this.change(
        true
      )
    },
    handleUnchecked () {
      this.change(
        false
      )
    }
  }
}
