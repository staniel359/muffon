<template>
  <div
    v-if="publishDate"
    class="main-date-section"
  >
    <small
      v-text="publishDateFormatted"
    />
  </div>
</template>

<script>
import {
  date as formatDate
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'BasePublishDateSection',
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    publishDate () {
      return this.modelData.publish_date
    },
    publishDateFormatted () {
      return formatDate(
        this.publishDate
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
