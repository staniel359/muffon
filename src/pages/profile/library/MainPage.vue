<template>
  <BaseProfileLibraryPageContainer
    :key="refreshKey"
    :profile-id="profileId"
  >
    <template
      #default="slotProps"
    >
      <BaseSegmentsContainer
        class="library-top-segment"
      >
        <StatisticsSegment
          :library-data="slotProps.libraryData"
        />

        <ExtraSegment
          :library-data="slotProps.libraryData"
          :profile-id="profileId"
          :is-self="isSelf"
        />
      </BaseSegmentsContainer>

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
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import ExtraSegment from './MainPage/ExtraSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryPageContainer,
    BaseSegmentsContainer,
    StatisticsSegment,
    ExtraSegment,
    TabsSegment
  },
  mixins: [
    pageMixin
  ],
  props: {
    profileId: {
      type: Number,
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

<style lang="sass" scoped>
.library-top-segment
  z-index: 1
</style>
