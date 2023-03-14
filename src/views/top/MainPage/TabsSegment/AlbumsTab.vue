<template>
  <BaseTopTabContainer
    :scope="scope"
    :limit="limit"
    :country="country"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :items-in-row="itemsInRow"
        is-with-artist-name
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseTopTabContainer>
</template>

<script>
import BaseTopTabContainer
  from '@/components/containers/tabs/top/BaseTopTabContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'AlbumsTab',
  components: {
    BaseTopTabContainer,
    BaseAlbumsTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    country: String
  },
  data () {
    return {
      limit:
        albumsLimits.table.small,
      itemsInRow: (
        albumsLimits.table.small / 2
      ),
      scope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
