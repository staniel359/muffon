<template>
  <BaseCounterLabelsSection
    :counters="counters"
  />
</template>

<script>
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'

export default {
  name: 'CountersSection',
  components: {
    BaseCounterLabelsSection
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    counters () {
      return [
        {
          scope: 'taggers',
          count: this.taggersCount
        },
        {
          scope: 'taggings',
          count: this.taggingsCount
        }
      ]
    },
    taggersCount () {
      return this.tagData.taggers_count
    },
    taggingsCount () {
      return this.tagData.taggings_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
