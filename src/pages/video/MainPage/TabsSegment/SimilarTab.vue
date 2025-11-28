<template>
  <BaseVideoTabContainer
    :video-id="videoId"
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
        is-with-channel-title
        is-with-favorite-option
        is-with-bookmark-option
        is-with-watched-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseVideoTabContainer>
</template>

<script>
import BaseVideoTabContainer
  from '@/components/containers/tabs/video/BaseVideoTabContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'
import {
  videos as videosLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'SimilarTab',
  components: {
    BaseVideoTabContainer,
    BaseVideosTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    videoId: String
  },
  data () {
    return {
      limit:
        videosLimits.table.small,
      scope: 'similar'
    }
  }
}
</script>

<style lang="sass" scoped></style>
