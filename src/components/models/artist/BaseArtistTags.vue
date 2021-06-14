<template>
  <BaseTagsList
    v-bind="$attrs"
    :tags="tags"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <ArtistTagsModal
    v-if="isMore"
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
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
