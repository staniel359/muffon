<template>
  <div class="ui labels large">
    <BaseLabel
      v-if="released"
      :text="released"
    />

    <template v-if="labels">
      <BaseLabel
        v-for="labelData in labelsFormatted"
        :key="labelData.uuid"
        :text="labelData.name"
      />
    </template>
  </div>
</template>

<script>
import BaseLabel from '@/BaseLabel.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseReleasedLabels',
  components: {
    BaseLabel
  },
  props: {
    released: String,
    labels: Array
  },
  computed: {
    labelsFormatted () {
      return formatCollection(
        this.labels
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
