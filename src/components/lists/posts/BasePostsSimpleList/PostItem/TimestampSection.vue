<template>
  <div class="description">
    <div class="main-small-container">
      <small>
        {{ createdDateFormatted }}
        {{ createdTimeFormatted }}
      </small>
    </div>
  </div>
</template>

<script>
import {
  date as formatDate,
  time as formatTime
} from '#/formatters'

export default {
  name: 'TimestampSection',
  props: {
    postData: {
      type: Object,
      required: true
    }
  },
  computed: {
    createdDateFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.postData.created
    },
    createdTimeFormatted () {
      return formatTime(
        this.created
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
