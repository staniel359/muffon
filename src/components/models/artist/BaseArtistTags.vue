<template>
  <BaseTagsList
    v-bind="$attrs"
    :tags="tags"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <BaseArtistTagsModal
    v-if="isMore"
    ref="modal"
    :artistName="artistName"
  />
</template>

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import BaseArtistTagsModal from '@/modals/artist/BaseArtistTagsModal.vue'

export default {
  name: 'BaseArtistTags',
  components: {
    BaseTagsList,
    BaseArtistTagsModal
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
