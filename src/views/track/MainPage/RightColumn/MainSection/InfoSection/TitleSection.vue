<template>
  <BaseHeader
    tag="h3"
    :text="trackTitle"
  />
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'TitleSection',
  components: {
    BaseHeader
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    trackTitle () {
      return this.trackData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
