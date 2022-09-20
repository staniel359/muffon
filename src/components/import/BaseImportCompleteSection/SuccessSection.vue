<template>
  <div
    ref="section"
    class="main-modal-import-section"
  >
    <SuccessMessage
      :collection-count="collectionCount"
      :scope="scope"
    />

    <TracksList
      :tracks="collection"
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
import BaseSaveButton from '@/components/buttons/BaseSaveButton.vue'

export default {
  name: 'SuccessSection',
  components: {
    SuccessMessage,
    TracksList,
    BaseSaveButton
  },
  inject: [
    'save'
  ],
  props: {
    collection: {
      type: Array,
      default () {
        return []
      }
    },
    scope: String
  },
  computed: {
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
