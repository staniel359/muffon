<template>
  <template
    v-if="description"
  >
    <BaseDivider
      class="small"
    />

    <BaseArtistDescription
      :artist-data="artistData"
      is-small
      :is-with-more="false"
    />
  </template>
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BaseArtistDescription
  from '@/components/models/artist/BaseArtistDescription.vue'

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
    }
  }
}
</script>

<style lang="sass" scoped></style>
