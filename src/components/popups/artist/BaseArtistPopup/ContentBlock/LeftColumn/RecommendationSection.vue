<template>
  <div>
    <BaseLabel
      class="basic circular small"
      left-icon="recommendation"
      :text="recommendationArtistsCountString"
    />
  </div>
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'RecommendationSection',
  components: {
    BaseLabel
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    recommendationArtistsCountString () {
      return this.recommendationData
        .artists_count
        .toString()
    }
  }
}
</script>

<style lang="sass" scoped></style>
