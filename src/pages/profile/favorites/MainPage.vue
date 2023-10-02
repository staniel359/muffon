<template>
  <BaseProfileFavoritesPageContainer
    :key="refreshKey"
    :profile-id="profileId"
  >
    <BaseSegmentsContainer
      class="main-page-segment-container"
    >
      <TopSegment
        v-if="isSelf"
      />

      <TabsSegment
        :profile-id="profileId"
      />
    </BaseSegmentsContainer>
  </BaseProfileFavoritesPageContainer>
</template>

<script>
import BaseProfileFavoritesPageContainer
  from '@/components/containers/pages/profile/favorites/BaseProfileFavoritesPageContainer.vue'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import TopSegment from './MainPage/TopSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'
import pageMixin from '@/mixins/pageMixin'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseProfileFavoritesPageContainer,
    BaseSegmentsContainer,
    TopSegment,
    TabsSegment
  },
  mixins: [
    pageMixin
  ],
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
