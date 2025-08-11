<template>
  <BaseProfileLibraryTabContainer
    :profile-id="profileId"
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
        is-with-library
        is-link-to-library
        is-with-created
        is-with-page-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseProfileLibraryTabContainer>
</template>

<script>
import BaseProfileLibraryTabContainer
  from '@/components/containers/tabs/profile/library/BaseProfileLibraryTabContainer.vue'
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'ArtistsTab',
  components: {
    BaseProfileLibraryTabContainer,
    BaseArtistsTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: Number,
    isSelf: Boolean
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
