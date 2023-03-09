<template>
  <div
    class="main-inner-counter-labels-section"
  >
    <BaseIcon
      icon="colored muffon"
    />

    <div class="ui labels">
      <BaseLabel
        class="basic circular"
        icon="listener"
        :class="size"
        :text="listenersCountFormatted"
        :is-clickable="isClickable"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseInnerCounterLabelsSection',
  components: {
    BaseIcon,
    BaseLabel
  },
  props: {
    listenersCount: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: 'large'
    },
    isClickable: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    listenersCountFormatted () {
      return formatNumber(
        this.listenersCount
      )
    }
  },
  methods: {
    handleClick () {
      if (this.isClickable) {
        this.$emit(
          'click'
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
