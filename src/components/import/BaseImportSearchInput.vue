<template>
  <Component
    :is="component"
    ref="input"
    class="search-input"
    :profile-id="profileId"
    :[scope]="collection"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import ArtistsInput from './BaseImportSearchInput/ArtistsInput.vue'
import AlbumsInput from './BaseImportSearchInput/AlbumsInput.vue'
import TracksInput from './BaseImportSearchInput/TracksInput.vue'

export default {
  name: 'BaseImportSearchInput',
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

<style lang="sass" scoped>
.search-input
  @extend .flex-full
</style>
