<template>
  <BaseProfilePageContainer
    :profileId="profileId"
  >
    <template #default="slotProps">
      <div class="main-library-page-columns-container">
        <div :class="[
          'main-library-page-left-column',
          'main-sticky-container'
        ]">
          <InfoSegment
            :profileData="slotProps.profileData"
          />
        </div>

        <div class="main-library-page-right-column">
          <LibrarySegment
            :profileId="slotProps.profileData.id.toString()"
          />
        </div>
      </div>
    </template>
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '@/containers/pages/profile/BaseProfilePageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import LibrarySegment from './MainPage/LibrarySegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePageContainer,
    InfoSegment,
    LibrarySegment
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
