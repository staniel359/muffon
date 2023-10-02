<template>
  <div class="middle-aligned">
    <BaseIcon
      class="colored main-left-small-icon main-top-small-section"
      icon="muffon"
    />

    <BaseCounterLabelsSection
      :counters="counters"
      :size="size"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'

export default {
  name: 'BaseInnerCounterLabelsSection',
  components: {
    BaseIcon,
    BaseCounterLabelsSection
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
    counters () {
      return [
        {
          scope: 'listeners',
          count: this.listenersCount,
          isClickable: this.isClickable,
          onClick: this.handleClick
        }
      ]
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
