<template>
  <BaseAlbumsSimpleList
    :albums="albums"
    is-with-artist-name
    is-with-delete-option
    is-clearable
    @link-click="handleLinkClick"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'

export default {
  name: 'AlbumsSection',
  components: {
    BaseAlbumsSimpleList
  },
  inject: [
    'deleteModel'
  ],
  props: {
    albums: Array
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleDeleteButtonClick (
      {
        uuid
      }
    ) {
      this.deleteModel(
        {
          uuid,
          scope: 'albums'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
