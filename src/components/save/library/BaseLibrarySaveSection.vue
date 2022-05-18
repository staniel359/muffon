<template>
  <Component
    :is="component"
    :[scope]="collection"
  />
</template>

<script>
import ArtistsSection from './BaseLibrarySaveSection/ArtistsSection.vue'
import AlbumsSection from './BaseLibrarySaveSection/AlbumsSection.vue'
import TracksSection from './BaseLibrarySaveSection/TracksSection.vue'

export default {
  name: 'BaseLibrarySaveSection',
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
