<template>
  <div
    :class="[
      'main-small-container',
      'created-block'
    ]"
  >
    <div>
      <small
        v-text="createdDateFormatted"
      />
    </div>

    <div>
      <small
        v-text="createdTimeFormatted"
      />
    </div>
  </div>
</template>

<script>
import {
  date as formatDate,
  time as formatTime
} from '*/helpers/formatters'

export default {
  name: 'CreatedBlock',
  props: {
    trackData: {
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
      return this.trackData.created
    },
    createdTimeFormatted () {
      return formatTime(
        this.created
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.created-block
  margin-left: 0.5em !important
  text-align: right
</style>
