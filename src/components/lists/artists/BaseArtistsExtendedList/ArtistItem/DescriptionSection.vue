<template>
  <template v-if="description">
    <BaseDivider />

    <BaseArtistDescription
      :description="description"
      :artistName="artistName"
      :isMore="isMore"
    />
  </template>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import BaseArtistDescription from '@/models/artist/BaseArtistDescription.vue'

export default {
  name: 'DescriptionSection',
  components: {
    BaseDivider,
    BaseArtistDescription
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.artistData.description
    },
    artistName () {
      return this.artistData.name
    },
    isMore () {
      return this.artistData.with_more.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
