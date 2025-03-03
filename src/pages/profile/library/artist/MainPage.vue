<template>
  <BaseProfileLibraryArtistPageContainer
    :key="refreshKey"
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
  >
    <template
      #default="slotProps"
    >
      <div class="main-columns-container">
        <LeftColumn
          :artist-data="slotProps.artistData"
          :profile-id="profileId"
        />

        <RightColumn
          :artist-data="slotProps.artistData"
          :profile-id="profileId"
          :library-artist-id="libraryArtistId"
        />
      </div>
    </template>
  </BaseProfileLibraryArtistPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPageContainer
  from '@/components/containers/pages/profile/library/artist/BaseProfileLibraryArtistPageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryArtistPageContainer,
    LeftColumn,
    RightColumn
  },
  mixins: [
    pageMixin
  ],
  props: {
    profileId: Number,
    libraryArtistId: Number
  }
}
</script>

<style lang="sass" scoped></style>
