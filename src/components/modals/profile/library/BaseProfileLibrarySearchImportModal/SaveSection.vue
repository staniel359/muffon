<template>
  <Component
    :is="component"
    :[scope]="collection"
  />
</template>

<script>
import ArtistsSection from './SaveSection/ArtistsSection.vue'
import AlbumsSection from './SaveSection/AlbumsSection.vue'
import TracksSection from './SaveSection/TracksSection.vue'

export default {
  name: 'SaveSection',
  components: {
    ArtistsSection,
    AlbumsSection,
    TracksSection
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    collection: Array
  },
  data () {
    return {
      components: {
        artists: 'ArtistsSection',
        albums: 'AlbumsSection',
        tracks: 'TracksSection'
      }
    }
  },
  computed: {
    component () {
      return this.components[
        this.scope
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
