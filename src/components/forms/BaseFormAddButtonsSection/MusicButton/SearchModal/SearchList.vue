<template>
  <Component
    :is="component"
    ref="input"
    class="search-input"
    :[scope]="collection"
  />
</template>

<script>
import ArtistsList from './SearchList/ArtistsList.vue'
import AlbumsList from './SearchList/AlbumsList.vue'
import TracksList from './SearchList/TracksList.vue'

export default {
  name: 'SearchList',
  components: {
    ArtistsList,
    AlbumsList,
    TracksList
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
        artists: 'ArtistsList',
        albums: 'AlbumsList',
        tracks: 'TracksList'
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
