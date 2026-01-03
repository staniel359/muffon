<template>
  <BaseButton
    class="basic mini compact circular main-right-small-section"
    :class="{
      red: isRed
    }"
    :is-invertable="isInvertable"
    :icon="icon"
    :text="text"
    @click.prevent.stop="handleClick"
    @active-change="handleActiveChange"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseClearButton',
  components: {
    BaseButton
  },
  props: {
    isRed: {
      type: Boolean,
      default: true
    },
    isWithIcon: {
      type: Boolean,
      default: true
    },
    isInvertable: Boolean,
    action: String
  },
  emits: [
    'click',
    'activeChange'
  ],
  computed: {
    icon () {
      if (this.isWithIcon) {
        return 'clear'
      } else {
        return null
      }
    },
    text () {
      if (this.action) {
        return this.$t(
          `actions.${this.action}`
        )
      } else {
        return null
      }
    }
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
    handleActiveChange (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
