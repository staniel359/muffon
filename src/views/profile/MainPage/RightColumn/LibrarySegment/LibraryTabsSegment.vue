<template>
  <BaseSegmentContainer
    ref="segment"
  >
    <BaseTabsContainer
      :tabs="tabs"
      is-fluid
      @tab-click="handleTabClick"
    >
      <template
        v-for="(tabData, index) in tabs"
        :key="index"
        #[index]="slotProps"
      >
        <Component
          :is="tabData.component"
          class="main-relative-tab"
          :class="slotProps.class"
          :is-active="slotProps.isActive"
          :profile-id="profileId"
          @focus="handleFocus"
        />
      </template>
    </BaseTabsContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseTabsContainer
  from '*/components/containers/tabs/BaseTabsContainer.vue'
import ArtistsTab from './LibraryTabsSegment/ArtistsTab.vue'
import AlbumsTab from './LibraryTabsSegment/AlbumsTab.vue'
import TracksTab from './LibraryTabsSegment/TracksTab.vue'
import TagsTab from './LibraryTabsSegment/TagsTab.vue'

export default {
  name: 'LibraryTabsSegment',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab,
    TagsTab
  },
  props: {
    profileId: String
  },
  computed: {
    tabs () {
      return [
        {
          nameCode: 'navigation.artists',
          component: 'ArtistsTab'
        },
        {
          nameCode: 'navigation.albums',
          component: 'AlbumsTab'
        },
        {
          nameCode: 'navigation.tracks',
          component: 'TracksTab'
        },
        {
          nameCode: 'navigation.tags',
          component: 'TagsTab'
        }
      ]
    }
  },
  methods: {
    handleTabClick () {
      this.focus()
    },
    handleFocus () {
      this.focus()
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
