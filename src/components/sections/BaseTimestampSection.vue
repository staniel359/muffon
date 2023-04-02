<template>
  <div>
    <small
      v-text="createdText"
    />
  </div>
</template>

<script>
import {
  date as formatDate,
  dateTime as formatDateTime
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'BaseTimestampSection',
  props: {
    created: {
      type: String,
      required: true
    },
    isOnlyDate: Boolean
  },
  computed: {
    createdText () {
      if (this.isOnlyDate) {
        return this.createdDateFormatted
      } else {
        return this.createdDateTimeFormatted
      }
    },
    createdDateFormatted () {
      return formatDate(
        this.created
      )
    },
    createdDateTimeFormatted () {
      return formatDateTime(
        this.created
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
