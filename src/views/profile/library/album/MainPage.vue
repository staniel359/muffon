<template>
  <BaseProfileLibraryAlbumPageContainer
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
  >
    <template #default="slotProps">
      <div class="main-profile-page-columns-container">
        <LeftColumn
          :album-data="slotProps.albumData"
          :profile-id="profileId"
        />

        <RightColumn
          :album-data="slotProps.albumData"
          :profile-id="profileId"
          :library-album-id="libraryAlbumId"
        />
      </div>
    </template>
  </BaseProfileLibraryAlbumPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPageContainer
  from '*/components/containers/pages/profile/library/album/BaseProfileLibraryAlbumPageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryAlbumPageContainer,
    LeftColumn,
    RightColumn
  },
  props: {
    profileId: String,
    libraryAlbumId: String
  }
}
</script>

<style lang="sass" scoped></style>
