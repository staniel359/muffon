<template>
  <BaseHeader
    tag="h3"
    :text="videoTitle"
  />

  <BaseLink
    :link="videoChannelVideosLink"
    :text="channelTitle"
  />

  <BaseDivider />

  <div class="video-labels">
    <div class="ui large labels">
      <BaseLabel
        icon="eye outline"
        :text="viewsCountFormatted"
      />

      <BaseLabel
        icon="calendar outline"
        :text="publishDate"
      />
    </div>

    <div class="ui large labels">
      <BaseLabel
        icon="thumbs up outline"
        :text="likesCountFormatted"
      />

      <BaseLabel
        icon="thumbs down outline"
        :text="dislikesCountFormatted"
      />
    </div>
  </div>

  <BaseVideoTags
    v-if="tags.length"
    :tags="tags"
    :isMore="isMoreTags"
    :videoId="videoId"
  />

  <template v-if="description">
    <BaseDivider />

    <BaseVideoDescription
      :description="description"
      :isMore="isMoreDescription"
      :videoId="videoId"
    />
  </template>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseLink from '@/links/BaseLink.vue'
import BaseLabel from '@/BaseLabel.vue'
import BaseVideoTags from '@/models/video/BaseVideoTags.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseVideoDescription from '@/models/video/BaseVideoDescription.vue'
import {
  videos as formatVideoChannelVideosLink
} from '#/formatters/links/videoChannel'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'VideoInfoData',
  components: {
    BaseHeader,
    BaseLink,
    BaseLabel,
    BaseVideoTags,
    BaseDivider,
    BaseVideoDescription
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    videoTitle () {
      return this.videoData.title
    },
    videoChannelVideosLink () {
      return formatVideoChannelVideosLink({
        channelId: this.channelId,
        channelTitle: this.channelTitle
      })
    },
    channelId () {
      return this.videoData.channel.youtube_id
    },
    channelTitle () {
      return this.videoData.channel.title
    },
    viewsCountFormatted () {
      return formatNumber(
        this.videoData.views_count
      )
    },
    publishDate () {
      return this.videoData.publish_date
    },
    likesCountFormatted () {
      return formatNumber(
        this.videoData.likes_count
      )
    },
    dislikesCountFormatted () {
      return formatNumber(
        this.videoData.dislikes_count
      )
    },
    tags () {
      return this.videoData.tags
    },
    isMoreTags () {
      return this.videoData.with_more.tags
    },
    videoId () {
      return this.videoData.youtube_id
    },
    description () {
      return this.videoData.description
    },
    isMoreDescription () {
      return this.videoData.with_more.description
    }
  }
}
</script>

<style lang="sass" scoped>
.video-labels
  @extend .d-flex, .justify-content-space-between
</style>
