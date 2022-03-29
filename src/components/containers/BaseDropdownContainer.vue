<template>
  <div
    ref="dropdown"
    class="ui selection dropdown main-dropdown"
    :class="{
      inverted: isDarkMode,
      disabled: isDisabled
    }"
  >
    <div
      class="text main-dropdown-item"
      :class="{ inverted: isDarkMode }"
    >
      <BaseHeader
        v-if="header"
        tag="h5"
        :text="header"
      />
    </div>

    <BaseIcon
      icon="dropdown"
      :isLoading="isLoading"
      :isError="isError"
    />

    <div class="menu">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import { mainDropdownOptions } from '*/helpers/data/plugins/semantic'
import {
  setDropdown,
  setDropdownValue,
  resetDropdown
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseDropdownContainer',
  components: {
    BaseHeader,
    BaseIcon
  },
  props: {
    header: String,
    isDisabled: Boolean,
    isLoading: Boolean,
    isError: Boolean
  },
  emits: [
    'change'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    dropdownOptions () {
      return mainDropdownOptions({
        onChange: this.handleChange
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      setDropdown(
        this.$refs.dropdown,
        this.dropdownOptions
      )
    })
  },
  methods: {
    handleChange (value) {
      this.$emit(
        'change',
        value
      )
    },
    setValue (value) {
      this.$nextTick(() => {
        setDropdownValue(
          this.$refs.dropdown,
          value
        )
      })
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
