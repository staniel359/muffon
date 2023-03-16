<template>
  <div
    v-if="created"
    class="main-created-section"
  >
    <div
      v-if="isSmall"
      class="main-small-container"
    >
      <small
        v-text="createdDateFormatted"
      />
    </div>
    <div
      v-else
      class="main-header"
      v-text="createdDateFormatted"
    />

    <div
      v-if="isSmall"
      class="main-small-container"
    >
      <small
        v-text="createdTimeFormatted"
      />
    </div>
    <div
      v-else
      class="main-header"
      v-text="createdTimeFormatted"
    />
  </div>
</template>

<script>
import {
  date as formatDate,
  time as formatTime
} from '@/helpers/formatters'

export default {
  name: 'BaseCreatedSection',
  props: {
    modelData: {
      type: Object,
      required: true
    },
    isSmall: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    createdDateFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.modelData.created
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
