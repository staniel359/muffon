<template>
  <BaseProfileLibraryTrackTabContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
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
        :profile-id="profileId"
        :items-in-row="itemsInRow"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-artist-name
        is-with-library
        is-link-to-library
        is-with-source
        is-with-created
        is-with-page-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseProfileLibraryTrackTabContainer>
</template>

<script>
import BaseProfileLibraryTrackTabContainer
  from '@/components/containers/tabs/profile/library/track/BaseProfileLibraryTrackTabContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'AlbumsTab',
  components: {
    BaseProfileLibraryTrackTabContainer,
    BaseAlbumsTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: String,
    libraryTrackId: String,
    isSelf: Boolean
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
