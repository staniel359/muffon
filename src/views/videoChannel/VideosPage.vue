<template>
  <BaseVideoChannelPaginatedPageContainer
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="slotProps"
    >
      <BaseVideosTableList
        :videos="slotProps[scope]"
        is-with-share-option
      />
    </template>
  </BaseVideoChannelPaginatedPageContainer>
</template>

<script>
import BaseVideoChannelPaginatedPageContainer
  from '@/components/containers/pages/videoChannel/BaseVideoChannelPaginatedPageContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoChannelPaginatedPageContainer,
    BaseVideosTableList
  },
  props: {
    channelId: String
  },
  data () {
    return {
      limit: 40,
      scope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
