<template>
  <BaseTagsList
    v-if="tags.length"
    v-bind="$attrs"
    :tags="tags"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <ArtistTagsModal
    v-if="isRenderModal"
    ref="modal"
    :artistName="artistName"
  />
</template>

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import ArtistTagsModal from './BaseArtistTags/ArtistTagsModal.vue'

export default {
  name: 'BaseArtistTags',
  components: {
    BaseTagsList,
    ArtistTagsModal
  },
  props: {
    tags: Array,
    isMore: Boolean,
    artistName: String
  },
  computed: {
    isRenderModal () {
      return (
        this.isMore &&
          this.tags.length
      )
    }
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
