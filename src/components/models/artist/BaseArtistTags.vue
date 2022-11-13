<template>
  <div
    v-if="tags"
  >
    <BaseTagsSimpleList
      :tags="tags"
      :is-more="isRenderMore"
      :size="size"
      is-with-icon
      @more-click="handleMoreClick"
      @link-click="handleLinkClick"
    />

    <BaseArtistTagsModal
      v-if="isRenderMore"
      ref="modal"
      :artist-name="artistName"
    />
  </div>
</template>

<script>
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import BaseArtistTagsModal
  from '@/components/modals/artist/BaseArtistTagsModal.vue'

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
    },
    isWithMore: {
      type: Boolean,
      default: true
    },
    size: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    tags () {
      return this.artistData.tags
    },
    isRenderMore () {
      return (
        this.isMore &&
          this.isWithMore
      )
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
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
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
