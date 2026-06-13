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
          :is-activated="slotProps.isActivated"
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
    communityData: {
      type: Object,
      required: true
    },
    communityId: Number,
    isCommunityCreator: Boolean
  },
  data () {
    return {
      tabs: [
        {
          icon: 'post',
          nameCode: 'navigation.posts',
          component: 'PostsTab',
          counter: this.communityData.posts_count
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
