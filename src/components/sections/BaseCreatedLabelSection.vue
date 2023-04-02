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
  dateTime as formatDateTime
} from '@/helpers/formatters/dateTimeString'

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
      return formatDateTime(
        this.created
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
