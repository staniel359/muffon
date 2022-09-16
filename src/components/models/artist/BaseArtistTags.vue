<template>
  <div
    v-if="tags"
  >
    <BaseTagsSimpleList
      :tags="tags"
      :is-more="isMore"
      is-with-icon
      @more-click="handleMoreClick"
    />

    <BaseArtistTagsModal
      v-if="isMore"
      ref="modal"
      :artist-name="artistName"
    />
  </div>
</template>

<script>
import BaseTagsSimpleList from '*/components/lists/tags/BaseTagsSimpleList.vue'
import BaseArtistTagsModal
  from '*/components/modals/artist/BaseArtistTagsModal.vue'

export default {
  name: 'BaseArtistTags',
  components: {
    BaseTagsSimpleList,
    BaseArtistTagsModal
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags () {
      return this.artistData.tags
    },
    isMore () {
      return this.artistData.with_more?.tags
    },
    artistName () {
      return this.artistData.name
    }
  },
  methods: {
    handleMoreClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
