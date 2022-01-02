<template>
  <template v-if="tags">
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
