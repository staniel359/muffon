<template>
  <div
    class="main-counter-section"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <small>
      <BaseIcon
        :icon="icon"
      />

      <span
        v-html="countFormatted"
      />
    </small>
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseListCounterSection',
  components: {
    BaseIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  emits: [
    'activeChange',
    'click'
  ],
  computed: {
    countFormatted () {
      return formatNumber(
        this.count
      )
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
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
