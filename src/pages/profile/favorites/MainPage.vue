<template>
  <BaseProfileFavoritesPageContainer
    :key="refreshKey"
    :profile-id="profileId"
  >
    <div
      :class="[
        'ui raised segments main-segments',
        'main-segment-container',
        'main-page-segment-container'
      ]"
    >
      <TopSegment
        v-if="isSelf"
      />

      <TabsSegment
        :profile-id="profileId"
      />
    </div>
  </BaseProfileFavoritesPageContainer>
</template>

<script>
import BaseProfileFavoritesPageContainer
  from '@/components/containers/pages/profile/favorites/BaseProfileFavoritesPageContainer.vue'
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
