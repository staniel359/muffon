<template>
  <BaseVideoChannelTabContainer
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseVideosTableList
        :videos="slotProps[scope]"
        is-with-favorite-option
        is-with-bookmark-option
        is-with-watched-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseVideoChannelTabContainer>
</template>

<script>
import BaseVideoChannelTabContainer
  from '@/components/containers/tabs/videoChannel/BaseVideoChannelTabContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'
import {
  videos as videosLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'VideosTab',
  components: {
    BaseVideoChannelTabContainer,
    BaseVideosTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    channelId: String
  },
  data () {
    return {
      limit:
        videosLimits.table.small,
      scope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
