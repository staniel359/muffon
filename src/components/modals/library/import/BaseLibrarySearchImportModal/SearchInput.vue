<template>
  <Component
    :is="component"
    ref="input"
    class="main-simple-search-input"
    :source="source"
    :[scope]="collection"
    @select="handleSelect"
  />
</template>

<script>
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
  inject: [
    'addCollectionItem',
    'reset'
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    source: String,
    collection: Array,
    isSave: Boolean
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
    component () {
      return this.components[
        this.scope
      ]
    }
  },
  methods: {
    async handleSelect (
      value
    ) {
      if (this.isSave) {
        this.reset()
      }

      await this.$nextTick()

      this.addCollectionItem(
        {
          collection: 'collection',
          item: value
        }
      )
    },
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

<style lang="sass" scoped></style>
