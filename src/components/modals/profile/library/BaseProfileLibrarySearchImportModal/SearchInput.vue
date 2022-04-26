<template>
  <Component
    :is="component"
    ref="input"
    class="search-input"
    :profile-id="profileId"
    :[scope]="collection"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import ArtistsInput from './SearchInput/ArtistsInput.vue'
import AlbumsInput from './SearchInput/AlbumsInput.vue'
import TracksInput from './SearchInput/TracksInput.vue'

export default {
  name: 'SearchInput',
  components: {
    ArtistsInput,
    AlbumsInput,
    TracksInput
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
        artists: 'ArtistsInput',
        albums: 'AlbumsInput',
        tracks: 'TracksInput'
      }
    }
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    component () {
      return this.components[
        this.scope
      ]
    }
  },
  methods: {
    focus () {
      this.$refs
        .input
        .focus()
    },
    clear () {
      this.$refs
        .input
        .clear()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-input
  @extend .flex-full
</style>
