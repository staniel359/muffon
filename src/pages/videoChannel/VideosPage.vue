<template>
  <BaseVideoChannelPaginatedPageContainer
    :key="refreshKey"
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseVideosList
        :videos="slotProps[scope]"
        :view-id="viewId"
        is-with-favorite-option
        is-with-bookmark-option
        is-with-watched-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseVideoChannelPaginatedPageContainer>
</template>

<script>
import BaseVideoChannelPaginatedPageContainer
  from '@/components/containers/pages/videoChannel/BaseVideoChannelPaginatedPageContainer.vue'
import BaseVideosList from '@/components/lists/videos/BaseVideosList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'VideosPage',
  components: {
    BaseVideoChannelPaginatedPageContainer,
    BaseVideosList
  },
  mixins: [
    viewChangeMixin,
    pageMixin
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
