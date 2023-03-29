<template>
  <BaseTagTabContainer
    :scope="scope"
    :limit="limit"
    :tag-name="tagName"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :items-in-row="itemsInRow"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseTagTabContainer>
</template>

<script>
import BaseTagTabContainer
  from '@/components/containers/tabs/tag/BaseTagTabContainer.vue'
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'ArtistsTab',
  components: {
    BaseTagTabContainer,
    BaseArtistsTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    tagName: String
  },
  data () {
    return {
      limit:
        artistsLimits.table.small,
      itemsInRow: (
        artistsLimits.table.small / 2
      ),
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
