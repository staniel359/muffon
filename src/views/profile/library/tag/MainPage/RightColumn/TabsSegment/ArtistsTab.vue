<template>
  <BaseProfileLibraryTagTabContainer
    :profile-id="profileId"
    :library-tag-id="libraryTagId"
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
        :profile-id="profileId"
        :items-in-row="itemsInRow"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-link-to-library
        is-with-library
        is-with-created
        is-with-page-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryTagTabContainer>
</template>

<script>
import BaseProfileLibraryTagTabContainer
  from '@/components/containers/tabs/profile/library/tag/BaseProfileLibraryTagTabContainer.vue'
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'ArtistsTab',
  components: {
    BaseProfileLibraryTagTabContainer,
    BaseArtistsTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: String,
    libraryTagId: String,
    isSelf: Boolean
  },
  data () {
    return {
      limit: (
        artistsLimits.table.extrasmall * 2
      ),
      itemsInRow:
        artistsLimits.table.extrasmall,
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
