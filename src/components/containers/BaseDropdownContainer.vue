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
      class="colored main-dropdown-icon"
      :icon="value"
    />
    <div
      v-else
      class="text main-dropdown-item"
      :class="{
        inverted: isDarkMode,
        default: isFormField
      }"
    >
      <template v-if="header">
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

    <slot name="input" />

    <div
      class="menu"
      :class="menuDirection"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import {
  mainDropdownOptions
} from '@/helpers/data/plugins/semantic'
import {
  setDropdown,
  setDropdownValue,
  resetDropdown
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'BaseDropdownContainer',
  components: {
    BaseHeader,
    BaseIcon
  },
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
    isFormField: Boolean
  },
  emits: [
    'select'
  ],
  data () {
    return {
      value: null
    }
  },
  computed: {
    ...mapState(
      'layout',
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
    selected: {
      immediate: true,
      handler: 'handleSelectedChange'
    }
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      this.dropdownOptions
    )
  },
  methods: {
    async handleSelectedChange (
      value
    ) {
      await this.$nextTick()

      setDropdownValue(
        this.$refs.dropdown,
        value
      )
    },
    handleSelect (
      value
    ) {
      this.value = value

      this.$emit(
        'select',
        value
      )
    },
    reset () {
      resetDropdown(
        this.$refs.dropdown
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
