<template>
  <BaseProfileLibraryTrackPageContainer
    :key="refreshKey"
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
  >
    <template
      #default="slotProps"
    >
      <div class="main-columns-container">
        <LeftColumn
          :track-data="slotProps.trackData"
          :profile-id="profileId"
        />

        <RightColumn
          :track-data="slotProps.trackData"
          :profile-id="profileId"
          :library-track-id="libraryTrackId"
        />
      </div>
    </template>
  </BaseProfileLibraryTrackPageContainer>
</template>

<script>
import BaseProfileLibraryTrackPageContainer
  from '@/components/containers/pages/profile/library/track/BaseProfileLibraryTrackPageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryTrackPageContainer,
    LeftColumn,
    RightColumn
  },
  mixins: [
    pageMixin
  ],
  props: {
    profileId: Number,
    libraryTrackId: Number
  }
}
</script>

<style lang="sass" scoped></style>
