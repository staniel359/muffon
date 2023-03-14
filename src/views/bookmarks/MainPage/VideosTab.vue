<template>
  <BaseBookmarksTabContainer
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseVideosSimpleList
        :videos="slotProps[scope]"
        is-with-channel-title
        is-with-created
        is-bookmark
        is-with-favorite-option
        is-with-watched-option
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksTabContainer>
</template>

<script>
import BaseBookmarksTabContainer
  from '@/components/containers/tabs/bookmarks/BaseBookmarksTabContainer.vue'
import BaseVideosSimpleList
  from '@/components/lists/videos/BaseVideosSimpleList.vue'
import {
  videos as videosLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'VideosTab',
  components: {
    BaseBookmarksTabContainer,
    BaseVideosSimpleList
  },
  mixins: [
    tabMixin
  ],
  data () {
    return {
      limit:
        videosLimits.simple.small,
      scope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
