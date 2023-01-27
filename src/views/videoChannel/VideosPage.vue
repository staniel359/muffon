<template>
  <BaseVideoChannelPaginatedPageContainer
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
  >
    <template
      #default="slotProps"
    >
      <BaseVideosList
        :videos="slotProps[scope]"
        :view-id="viewId"
        is-with-watched-option
        is-with-share-option
      />
    </template>
  </BaseVideoChannelPaginatedPageContainer>
</template>

<script>
import BaseVideoChannelPaginatedPageContainer
  from '@/components/containers/pages/videoChannel/BaseVideoChannelPaginatedPageContainer.vue'
import BaseVideosList from '@/components/lists/videos/BaseVideosList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoChannelPaginatedPageContainer,
    BaseVideosList
  },
  mixins: [
    viewChangeMixin
  ],
  props: {
    channelId: String
  },
  data () {
    return {
      scope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
