<template>
  <div
    v-if="date"
  >
    <div class="ui labels">
      <BaseLabel
        class="basic circular large"
        left-icon="date"
        :text="dateFormatted"
      />
    </div>
  </div>
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  date as formatDate
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'BaseDateLabelSection',
  components: {
    BaseLabel
  },
  props: {
    date: String
  },
  computed: {
    dateFormatted () {
      return formatDate(
        this.date
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
