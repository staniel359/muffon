<template>
  <BaseDivider />

  <BaseArtistsSimpleList
    :artists="artists"
    :is-paginated="false"
    is-with-listeners-count
    is-with-library-option
    is-with-favorite-option
    is-with-bookmark-option
    is-with-listened-option
    is-with-share-option
    is-with-external-link-option
  />
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'ArtistSection',
  components: {
    BaseDivider,
    BaseArtistsSimpleList
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    artists () {
      return [
        this.artistData
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
