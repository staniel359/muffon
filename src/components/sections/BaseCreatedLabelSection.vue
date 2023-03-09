<template>
  <div
    v-if="created"
  >
    <div class="ui labels">
      <BaseLabel
        class="basic circular large"
        icon="date"
        :text="createdFormatted"
      />
    </div>
  </div>
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  date as formatDate,
  time as formatTime
} from '@/helpers/formatters'

export default {
  name: 'BaseCreatedLabelSection',
  components: {
    BaseLabel
  },
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    created () {
      return this.modelData.created
    },
    createdFormatted () {
      return [
        this.dateFormatted,
        this.timeFormatted
      ].join(
        ' '
      )
    },
    dateFormatted () {
      return formatDate(
        this.created
      )
    },
    timeFormatted () {
      return formatTime(
        this.created
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
