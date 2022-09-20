<template>
  <div class="main-modal-import-section">
    <Component
      :is="component"
      :[scope]="collection"
      :is-link-to-library="isLinkToLibrary"
    />
  </div>

  <BaseSaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import ArtistsList from './BaseImportSection/ArtistsList.vue'
import AlbumsList from './BaseImportSection/AlbumsList.vue'
import TracksList from './BaseImportSection/TracksList.vue'
import BaseSaveButton from '@/components/buttons/BaseSaveButton.vue'

export default {
  name: 'BaseImportSection',
  components: {
    ArtistsList,
    AlbumsList,
    TracksList,
    BaseSaveButton
  },
  inject: [
    'save'
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    collection: Array,
    isLinkToLibrary: Boolean
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
  },
  methods: {
    handleSaveButtonClick () {
      this.save()
    }
  }
}
</script>

<style lang="sass" scoped></style>
