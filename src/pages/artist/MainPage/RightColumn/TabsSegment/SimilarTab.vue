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
      <BaseArtistsTableList
        :artists="slotProps[scope]"
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
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'SimilarTab',
  components: {
    BaseArtistTabContainer,
    BaseArtistsTableList
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
        artistsLimits.table.extrasmall * 2
      ),
      itemsInRow:
        artistsLimits.table.extrasmall,
      scope: 'similar'
    }
  }
}
</script>

<style lang="sass" scoped></style>
