<template>
  <div
    ref="dropdown"
    class="ui dropdown main-dropdown"
    :class="{
      inverted: isDarkMode,
      disabled: isDisabled,
      selection: isSelection
    }"
  >
    <BaseIcon
      v-if="isOnlyIcon"
      class="main-dropdown-icon"
      :class="{
        colored: isColored
      }"
      :icon="icon"
    />
    <div
      v-else
      class="text main-dropdown-item"
      :class="{
        inverted: isDarkMode,
        default: isFormField && !value
      }"
    >
      <template
        v-if="header"
      >
        <div
          v-if="isFormField"
          v-text="header"
        />
        <BaseHeader
          v-else
          tag="h5"
          :text="header"
        />
      </template>
    </div>

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
        menuDirection,
        transparentClass
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  mainDropdownOptions
} from '@/helpers/formatters/semantic'
import {
  setDropdown,
  setDropdownValue,
  resetDropdown
} from '@/helpers/actions/plugins/semantic'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'BaseDropdownContainer',
  components: {
    BaseHeader,
    BaseIcon
  },
  mixins: [
    transparencyMixin
  ],
  props: {
    isSelection: {
      type: Boolean,
      default: true
    },
    selected: String,
    isOnlyIcon: Boolean,
    header: String,
    isDisabled: Boolean,
    isLoading: Boolean,
    isError: Boolean,
    menuDirection: String,
    isFormField: Boolean,
    inputType: String,
    inputName: String,
    isColored: Boolean,
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
          isSelection: this.isSelection,
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
      this.setValue(
        value
      )
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
.main-dropdown-item
  &:not(.inverted)
    ::v-deep(.ui.header)
      &.inverted
        @extend .text-color-initial
  &.inverted
    ::v-deep(.ui.header)
      @extend .text-color-white
</style>
