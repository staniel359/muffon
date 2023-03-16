<template>
  <div class="main-counter-section">
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
  computed: {
    countFormatted () {
      return formatNumber(
        this.count
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
