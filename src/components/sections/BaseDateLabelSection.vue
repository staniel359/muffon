<template>
  <div class="ui labels">
    <BaseLabel
      class="basic circular large"
      icon="calendar outline"
      :text="dateFormatted"
    />
  </div>
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  date as formatDate
} from '@/helpers/formatters'

export default {
  name: 'BaseDateLabelSection',
  components: {
    BaseLabel
  },
  props: {
    date: {
      type: String,
      required: true
    }
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
