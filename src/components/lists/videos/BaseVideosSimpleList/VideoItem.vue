<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="link"
    @click="handleLinkClick"
  >
    <BaseImage
      class="rounded-medium bordered video-image"
      model="video"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <BaseHeader
        tag="h4"
        :class="{
          link: isMainLinkActive
        }"
        :text="videoTitle"
      />

      <BaseVideoChannelLinkSection
        v-if="isWithChannelTitle"
        :model-data="videoData"
        @link-click="handleLinkClick"
        @active-change="handleChannelLinkActiveChange"
      />

      <BasePublishDateSection
        class="description"
        :model-data="videoData"
      />
    </div>

    <BaseVideoOptionsDropdown
      :video-data="videoData"
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
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoChannelLinkSection
  from '@/components/sections/videoChannel/BaseVideoChannelLinkSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseVideoOptionsDropdown
  from '@/components/dropdowns/video/BaseVideoOptionsDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatVideoMainLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'VideoItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseVideoChannelLinkSection,
    BasePublishDateSection,
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
    link () {
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
    handleChannelLinkActiveChange (
      value
    ) {
      this.isMainLinkActive = !value
    }
  }
}
</script>

<style lang="sass" scoped>
.video-image
  width: 110px !important
  height: calc(110px / 16 * 9) !important

.content
  @extend .no-padding
</style>
