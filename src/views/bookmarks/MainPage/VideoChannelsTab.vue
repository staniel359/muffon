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
      <BaseVideoChannelsSimpleList
        :channels="slotProps[scope]"
        is-with-created
        is-bookmark
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksTabContainer>
</template>

<script>
import BaseBookmarksTabContainer
  from '@/components/containers/tabs/bookmarks/BaseBookmarksTabContainer.vue'
import BaseVideoChannelsSimpleList
  from '@/components/lists/videoChannels/BaseVideoChannelsSimpleList.vue'
import {
  videoChannels as videoChannelsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'VideoChannelsTab',
  components: {
    BaseBookmarksTabContainer,
    BaseVideoChannelsSimpleList
  },
  mixins: [
    tabMixin
  ],
  data () {
    return {
      limit:
        videoChannelsLimits.simple.small,
      scope: 'videoChannels'
    }
  }
}
</script>

<style lang="sass" scoped></style>
