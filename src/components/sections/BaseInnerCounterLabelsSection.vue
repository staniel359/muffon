<template>
  <div
    class="main-inner-counter-labels-section"
  >
    <BaseImage
      class="image-extrasmall logo"
      :image="logo"
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
import BaseImage from '@/components/images/BaseImage.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseInnerCounterLabelsSection',
  components: {
    BaseImage,
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
    logo () {
      return require(
        '@/../public/logo.png'
      )
    },
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
