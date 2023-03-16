<template>
  <div
    class="main-inner-counter-labels-section"
  >
    <BaseIcon
      icon="colored muffon"
    />

    <div class="ui labels">
      <BaseCounterLabelsSection
        :counters="counters"
        :size="size"
      />
    </div>
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
