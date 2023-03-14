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
  </BaseTopTabContainer>
</template>

<script>
import BaseTopTabContainer
  from '@/components/containers/tabs/top/BaseTopTabContainer.vue'
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'ArtistsTab',
  components: {
    BaseTopTabContainer,
    BaseArtistsTableList
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
