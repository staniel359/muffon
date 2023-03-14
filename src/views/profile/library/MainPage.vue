<template>
  <BaseProfileLibraryPageContainer
    :profile-id="profileId"
  >
    <template
      #default="slotProps"
    >
      <div class="ui raised segments main-segment-container">
        <StatisticsSegment
          :library-data="slotProps.libraryData"
        />

        <ExtraSegment
          v-if="isSelf"
          :profile-id="profileId"
        />
      </div>

      <TabsSegment
        :profile-id="profileId"
        :is-self="isSelf"
      />
    </template>
  </BaseProfileLibraryPageContainer>
</template>

<script>
import BaseProfileLibraryPageContainer
  from '@/components/containers/pages/profile/library/BaseProfileLibraryPageContainer.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import ExtraSegment from './MainPage/ExtraSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryPageContainer,
    StatisticsSegment,
    ExtraSegment,
    TabsSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
