<template>
  <div class="main-small-container">
    <small
      v-text="createdText"
    />
  </div>
</template>

<script>
import {
  date as formatDate,
  time as formatTime
} from '*/helpers/formatters'

export default {
  name: 'BaseTimestamp',
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
        return [
          this.createdDateFormatted,
          this.createdTimeFormatted
        ].join(
          ' '
        )
      }
    },
    createdDateFormatted () {
      return formatDate(
        this.created
      )
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
