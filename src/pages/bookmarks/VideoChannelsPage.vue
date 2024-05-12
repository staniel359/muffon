<template>
  <BaseBookmarksPaginatedPageContainer
    :key="refreshKey"
    model="bookmarkVideoChannel"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseVideoChannelsSimpleList
        :channels="slotProps[scope]"
        is-with-created
        is-bookmark
        is-with-share-option
        is-with-external-link-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksPaginatedPageContainer>
</template>

<script>
import BaseBookmarksPaginatedPageContainer
  from '@/components/containers/pages/bookmarks/BaseBookmarksPaginatedPageContainer.vue'
import BaseVideoChannelsSimpleList
  from '@/components/lists/videoChannels/BaseVideoChannelsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  videoChannels as videoChannelsLimits
} from '@/helpers/data/limits'

export default {
  name: 'VideoChannelsPage',
  components: {
    BaseBookmarksPaginatedPageContainer,
    BaseVideoChannelsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  data () {
    return {
      limit:
        videoChannelsLimits.simple.large,
      scope: 'videoChannels',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
