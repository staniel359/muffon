<template>
  <div class="main-right-column">
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
          :community-id="communityId"
          :is-community-creator="isCommunityCreator"
          @focus="slotProps.handleFocus"
        />
      </template>
    </BaseTabsSegmentContainer>
  </div>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import PostsTab from './RightColumn/PostsTab.vue'

export default {
  name: 'RightColumn',
  components: {
    BaseTabsSegmentContainer,
    PostsTab
  },
  props: {
    communityId: String,
    isCommunityCreator: Boolean
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.posts',
          component: 'PostsTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
