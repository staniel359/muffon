<template>
  <div
    ref="section"
    class="main-modal-import-section"
  >
    <SuccessMessage
      :collection-count="collectionCount"
      :scope="textScope"
    />

    <Component
      :is="listComponent"
      :[scope]="collection"
      @focus="handleFocus"
    />
  </div>

  <BaseSaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import SuccessMessage from './SuccessSection/SuccessMessage.vue'
import TracksList from './SuccessSection/TracksList.vue'
import PlaylistsList from './SuccessSection/PlaylistsList.vue'
import BaseSaveButton from '@/components/buttons/BaseSaveButton.vue'

export default {
  name: 'SuccessSection',
  components: {
    SuccessMessage,
    TracksList,
    PlaylistsList,
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
    collection: {
      type: Array,
      default () {
        return []
      }
    },
    textScope: String
  },
  data () {
    return {
      listComponentsData: {
        tracks: 'TracksList',
        playlists: 'PlaylistsList'
      }
    }
  },
  computed: {
    listComponent () {
      return this.listComponentsData[
        this.scope
      ]
    },
    collectionCount () {
      return this.collection.length
    }
  },
  methods: {
    handleSaveButtonClick () {
      this.save(
        this.collection
      )
    },
    handleFocus () {
      this.focus()
    },
    focus () {
      this.$refs
        .section
        .scrollTo(
          0,
          0
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
