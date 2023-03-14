<template>
  <BaseProfileLibraryTagPageContainer
    :profile-id="profileId"
    :library-tag-id="libraryTagId"
  >
    <template
      #default="slotProps"
    >
      <div class="main-columns-container">
        <LeftColumn
          :tag-data="slotProps.tagData"
        />

        <RightColumn
          :tag-data="slotProps.tagData"
          :profile-id="profileId"
          :library-tag-id="libraryTagId"
        />
      </div>
    </template>
  </BaseProfileLibraryTagPageContainer>
</template>

<script>
import BaseProfileLibraryTagPageContainer
  from '@/components/containers/pages/profile/library/tag/BaseProfileLibraryTagPageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryTagPageContainer,
    LeftColumn,
    RightColumn
  },
  props: {
    profileId: String,
    libraryTagId: String
  }
}
</script>

<style lang="sass" scoped></style>
