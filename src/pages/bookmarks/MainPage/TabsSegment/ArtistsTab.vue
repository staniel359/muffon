<template>
  <BaseBookmarksTabContainer
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        is-with-created
        is-bookmark
        is-with-library-option
        is-with-favorite-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksTabContainer>
</template>

<script>
import BaseBookmarksTabContainer
  from '@/components/containers/tabs/bookmarks/BaseBookmarksTabContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'ArtistsTab',
  components: {
    BaseBookmarksTabContainer,
    BaseArtistsSimpleList
  },
  mixins: [
    tabMixin
  ],
  data () {
    return {
      limit:
        artistsLimits.simple.small,
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
