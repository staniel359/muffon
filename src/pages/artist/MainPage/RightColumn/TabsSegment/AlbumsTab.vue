<template>
  <BaseArtistTabContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :items-in-row="itemsInRow"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseArtistTabContainer>
</template>

<script>
import BaseArtistTabContainer
  from '@/components/containers/tabs/artist/BaseArtistTabContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'AlbumsTab',
  components: {
    BaseArtistTabContainer,
    BaseAlbumsTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      limit: (
        albumsLimits.table.extrasmall * 2
      ),
      itemsInRow:
        albumsLimits.table.extrasmall,
      scope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
