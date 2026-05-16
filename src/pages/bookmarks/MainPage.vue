<template>
  <BaseBookmarksPageContainer
    :key="refreshKey"
    :profile-id="profileId"
  >
    <template
      #default="slotProps"
    >
      <TabsSegment
        :bookmarks-data="slotProps.bookmarksData"
      />
    </template>
  </BaseBookmarksPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'

import BaseBookmarksPageContainer
  from '@/components/containers/pages/bookmarks/BaseBookmarksPageContainer.vue'
import TabsSegment from './MainPage/TabsSegment.vue'

import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseBookmarksPageContainer,
    TabsSegment
  },
  mixins: [
    pageMixin
  ],
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
