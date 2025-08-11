<template>
  <BaseTabsSegmentContainer
    :tabs="tabs"
  >
    <template
      #default="slotProps"
    >
      <Component
        :is="slotProps.component"
        :class="slotProps.class"
        :is-active="slotProps.isActive"
        :profile-id="profileId"
        :library-tag-id="libraryTagId"
        :is-self="isSelf"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import ArtistsTab from './TabsSegment/ArtistsTab.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    ArtistsTab
  },
  props: {
    profileId: {
      type: Number,
      required: true
    },
    libraryTagId: Number
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.artists',
          component: 'ArtistsTab'
        }
      ]
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
