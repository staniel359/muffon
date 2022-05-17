<template>
  <BaseAlbumsSimpleList
    :albums="albums"
    is-with-artist-name
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
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
    handleClearButtonClick (
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
