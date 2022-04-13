<template>
  <div class="main-modal-import-section">
    <Component
      :is="component"
      :[scope]="collection"
      @change="handleChange"
    />
  </div>

  <BaseSaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import ArtistsList from './lists/ArtistsList.vue'
import AlbumsList from './lists/AlbumsList.vue'
import TracksList from './lists/TracksList.vue'
import BaseSaveButton from '*/components/buttons/BaseSaveButton.vue'

export default {
  name: 'ImportSection',
  components: {
    ArtistsList,
    AlbumsList,
    TracksList,
    BaseSaveButton
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    collection: Array
  },
  emits: [
    'change',
    'save'
  ],
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
  },
  methods: {
    handleChange (
      value
    ) {
      this.$emit(
        'change',
        value
      )
    },
    handleSaveButtonClick () {
      this.$emit(
        'save'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
