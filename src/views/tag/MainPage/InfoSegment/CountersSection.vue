<template>
  <BaseCounters
    :taggers-count="taggersCount"
    :taggings-count="taggingsCount"
  />
</template>

<script>
import BaseCounters from '*/components/BaseCounters.vue'

export default {
  name: 'CountersSection',
  components: {
    BaseCounters
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
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
