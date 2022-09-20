<template>
  <BaseProfilePageContainer
    :profile-id="profileId"
  >
    <template #default="slotProps">
      <div class="main-profile-page-columns-container">
        <LeftColumn
          :profile-data="slotProps.profileData"
        />

        <RightColumn
          :profile-id="profileId"
          :profile-data="slotProps.profileData"
        />
      </div>
    </template>
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '@/components/containers/pages/profile/BaseProfilePageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePageContainer,
    LeftColumn,
    RightColumn
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
