<template>
  <i
    :class="[
      {
        flag: isFlag,
        icon: !isFlag,
        red: (
          isError && isIconRed
        )
      },
      iconConditional
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    />
  </i>
</template>

<script>
import icons from '@/helpers/data/icons'

export default {
  name: 'BaseIcon',
  props: {
    isFlag: Boolean,
    isLoading: Boolean,
    isError: Boolean,
    icon: String,
    isIconRed: Boolean
  },
  emits: [
    'activeChange',
    'click'
  ],
  computed: {
    iconConditional () {
      if (this.isLoading) {
        return null
      } else if (this.isError) {
        return icons.error
      } else {
        return this.iconFormatted
      }
    },
    iconFormatted () {
      return icons[
        this.icon
      ] || this.icon
    }
  },
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    },
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
