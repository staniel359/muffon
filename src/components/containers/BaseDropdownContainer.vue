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
      :icon="selected"
    />
    <div
      v-else
      class="text main-dropdown-item"
      :class="{
        inverted: isDarkMode
      }"
    >
      <BaseHeader
        v-if="header"
        tag="h5"
        :text="header"
      />
    </div>

    <BaseIcon
      icon="dropdown"
      :is-loading="isLoading"
      :is-error="isError"
    />

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
import BaseHeader from '*/components/BaseHeader.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  mainDropdownOptions
} from '*/helpers/data/plugins/semantic'
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
    isSelection: {
      type: Boolean,
      default: true
    },
    isOnlyIcon: Boolean,
    header: String,
    isDisabled: Boolean,
    isLoading: Boolean,
    isError: Boolean,
    menuDirection: String
  },
  emits: [
    'select'
  ],
  data () {
    return {
      selected: null
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
  async mounted () {
    await this.$nextTick()

    setDropdown(
      this.$refs.dropdown,
      this.dropdownOptions
    )
  },
  methods: {
    handleSelect (
      value
    ) {
      this.selected = value

      this.$emit(
        'select',
        value
      )
    },
    async setValue (
      value
    ) {
      await this.$nextTick()

      setDropdownValue(
        this.$refs.dropdown,
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
