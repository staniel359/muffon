<template>
  <div
    class="ui dropdown main-dropdown"
    ref="dropdown"
    :class="{
      inverted: isDarkMode,
      disabled: isDisabled
    }"
  >
    <div
      class="text main-dropdown-item"
      :class="{ inverted: isDarkMode }"
    >
      <div
        v-if="header"
        class="content"
      >
        <BaseHeader
          tag="h5"
          :text="header"
        />
      </div>
    </div>

    <BaseIcon
      v-if="icon"
      class="main-dropdown-icon main-dropdown-right-icon"
      :icon="icon"
      :isLoading="isLoading"
      :isError="isError"
    />

    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeader from '@/BaseHeader.vue'
import BaseIcon from '@/BaseIcon.vue'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { setDropdown, setDropdownValue } from '#/actions/plugins/semantic'

export default {
  name: 'BaseDropdownContainer',
  components: {
    BaseHeader,
    BaseIcon
  },
  props: {
    header: String,
    icon: String,
    isDisabled: Boolean,
    isLoading: Boolean,
    isError: Boolean
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      setDropdown(
        this.$refs.dropdown,
        mainDropdownOptions()
      )
    })
  },
  methods: {
    setValue (value) {
      this.$nextTick(() => {
        setDropdownValue(
          this.$refs.dropdown,
          value
        )
      })
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
