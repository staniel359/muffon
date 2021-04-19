<template>
  <div class="ui labels large">
    <div
      v-if="released"
      class="ui basic label"
    >
      {{ released }}
    </div>

    <template v-if="labels">
      <div
        v-for="labelData in labelsFormatted"
        class="ui basic label"
        :key="labelData.uuid"
      >
        {{ labelData.name }}
      </div>
    </template>
  </div>
</template>

<script>
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseReleasedLabels',
  props: {
    released: String,
    labels: Array
  },
  computed: {
    labelsFormatted () {
      return formatCollection(this.labels)
    }
  }
}
</script>

<style lang="sass" scoped></style>
