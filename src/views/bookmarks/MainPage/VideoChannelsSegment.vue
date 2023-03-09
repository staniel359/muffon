<template>
  <BaseBookmarksPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
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
  </BaseBookmarksPaginatedSegmentContainer>
</template>

<script>
import BaseBookmarksPaginatedSegmentContainer
  from '@/components/containers/segments/bookmarks/BaseBookmarksPaginatedSegmentContainer.vue'
import BaseVideoChannelsSimpleList
  from '@/components/lists/videoChannels/BaseVideoChannelsSimpleList.vue'
import {
  videoChannels as formatBookmarkVideoChannelsLink
} from '@/helpers/formatters/links/bookmarks'

export default {
  name: 'VideoChannelsSegment',
  components: {
    BaseBookmarksPaginatedSegmentContainer,
    BaseVideoChannelsSimpleList
  },
  data () {
    return {
      limit: 5,
      scope: 'videoChannels'
    }
  },
  computed: {
    headerLink () {
      return formatBookmarkVideoChannelsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
