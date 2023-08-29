<template>
  <div
    ref="dropdown"
    class="ui scrolling dropdown base-dropdown-container main-dropdown"
    :class="{
      inverted: isDarkMode,
      disabled: isDisabled,
      selection: isBordered,
      floating: !isBordered
    }"
  >
    <SelectedSection
      :is-only-icon="isOnlyIcon"
      :is-icon-colored="isIconColored"
      :icon="icon"
      :is-form-field="isFormField"
      :value="value"
      :header="header"
    />

    <BaseIcon
      icon="dropdown"
      :is-loading="isLoading"
      :is-error="isError"
    />

    <input
      v-if="isFormField"
      :type="inputType"
      :name="inputName"
    >

    <div
      class="blurred menu"
      :class="[
        transparentClass,
        {
          left: isMenuLeft
        }
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import SelectedSection from './BaseDropdownContainer/SelectedSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  main as mainDropdownOptions
} from '@/helpers/formatters/plugins/semantic/options/dropdown'
import {
  set as setDropdown,
  setValue as setDropdownValue,
  reset as resetDropdown
} from '@/helpers/actions/plugins/semantic/dropdown'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'BaseDropdownContainer',
  components: {
    SelectedSection,
    BaseIcon
  },
  mixins: [
    transparencyMixin
  ],
  props: {
    isBordered: {
      type: Boolean,
      default: true
    },
    selected: String,
    isOnlyIcon: Boolean,
    header: String,
    isDisabled: Boolean,
    isLoading: Boolean,
    isError: Boolean,
    isMenuLeft: Boolean,
    isFormField: Boolean,
    inputType: String,
    inputName: String,
    isIconColored: Boolean,
    options: Object
  },
  emits: [
    'select'
  ],
  data () {
    return {
      value: null,
      icon: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    dropdownOptions () {
      return mainDropdownOptions(
        {
          onChange: this.handleSelect
        }
      )
    }
  },
  watch: {
    selected: 'handleSelectedChange'
  },
  async mounted () {
    await this.$nextTick()

    setDropdown(
      this.$refs.dropdown,
      this.dropdownOptions
    )

    this.setValue(
      this.selected
    )
  },
  methods: {
    handleSelectedChange (
      value
    ) {
      if (value) {
        this.setValue(
          value
        )
      } else {
        this.reset()
      }
    },
    handleSelect (
      value
    ) {
      this.value = value

      this.setIcon()

      this.$emit(
        'select',
        value
      )
    },
    setValue (
      value
    ) {
      setDropdownValue(
        this.$refs.dropdown,
        value
      )

      this.value = value

      this.setIcon()
    },
    reset () {
      resetDropdown(
        this.$refs.dropdown
      )
    },
    setIcon () {
      if (this.isOnlyIcon) {
        this.icon = this.getIcon()
      }
    },
    getIcon () {
      return this.options.find(
        this.isMatchedOption
      ).icon
    },
    isMatchedOption (
      optionData
    ) {
      return (
        optionData.id ===
          this.value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.base-dropdown-container
  @extend .d-flex, .align-items-center, .text-color-unset, .background-transparent
  min-width: unset !important
  &.selection
    padding-right: 1em !important
    &.active,
    .menu
      @extend .border-color-base-light
  & > .text
    @extend .flex-full
  & > .icon
    &.dropdown
      @extend .relative, .no-padding, .no-margin
      top: 0 !important
      right: 0 !important
      margin-left: 0.75em !important
</style>
