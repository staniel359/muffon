<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="videoMainLink"
    @click="handleLinkClick"
  >
    <BaseImage
      class="rounded bordered video-image"
      model="video"
      :image="imageData?.small"
    />

    <div class="content">
      <BaseHeader
        tag="h4"
        :class="{
          link: isMainLinkActive
        }"
        :text="videoTitle"
      />

      <BaseLink
        v-if="isWithChannelTitle"
        :link="videoChannelMainLink"
        :text="channelTitle"
        @click="handleLinkClick"
        @mouseenter="handleChannelLinkMouseEnter"
        @mouseleave="handleChannelLinkMouseLeave"
      />

      <div class="description main-small-container">
        <small
          v-text="publishDate"
        />
      </div>
    </div>

    <BaseVideoOptionsDropdown
      :share-data="shareData"
      :is-with-share-option="isWithShareOption"
    />

    <BaseClearButton
      v-if="isWithClearButton"
      @click="handleClearButtonClick"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import BaseVideoOptionsDropdown
  from '*/components/dropdowns/video/BaseVideoOptionsDropdown.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import {
  main as formatVideoMainLink
} from '*/helpers/formatters/links/video'
import {
  main as formatVideoChannelMainLink
} from '*/helpers/formatters/links/videoChannel'
import {
  video as formatVideoShareData
} from '*/helpers/formatters/share'

export default {
  name: 'VideoItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseLink,
    BaseVideoOptionsDropdown,
    BaseClearButton
  },
  props: {
    videoData: {
      type: Object,
      required: true
    },
    isWithChannelTitle: Boolean,
    isWithShareOption: Boolean,
    isWithClearButton: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  data () {
    return {
      isMainLinkActive: true
    }
  },
  computed: {
    videoMainLink () {
      return formatVideoMainLink(
        {
          videoId: this.videoId
        }
      )
    },
    videoId () {
      return this.videoData.source.id
    },
    imageData () {
      return this.videoData.image
    },
    videoTitle () {
      return this.videoData.title
    },
    publishDate () {
      return this.videoData.publish_date
    },
    channelData () {
      return this.videoData.channel
    },
    videoChannelMainLink () {
      return formatVideoChannelMainLink(
        {
          channelId: this.channelId
        }
      )
    },
    channelId () {
      return this.channelData.source.id
    },
    channelTitle () {
      return this.channelData.title
    },
    shareData () {
      return formatVideoShareData(
        this.videoData
      )
    },
    uuid () {
      return this.videoData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick',
        {
          uuid: this.uuid
        }
      )
    },
    handleChannelLinkMouseEnter () {
      this.isMainLinkActive = false
    },
    handleChannelLinkMouseLeave () {
      this.isMainLinkActive = true
    }
  }
}
</script>

<style lang="sass" scoped>
.video-image
  width: 112px
  height: 63px
  margin-right: 0.5em !important

.content
  @extend .no-padding
</style>
