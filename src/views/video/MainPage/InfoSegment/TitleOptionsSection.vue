<template>
  <div class="title-options-section">
    <div class="title-section">
      <BaseHeader
        tag="h3"
        :text="videoTitle"
      />

      <BaseVideoChannelLinkSection
        :model-data="videoData"
      />
    </div>

    <BaseSelfIcons
      class="self-icons"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :watched-id="watchedId"
    />

    <BaseVideoOptionsPopup
      class="video-options"
      :video-data="videoData"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :watched-id="watchedId"
      is-with-favorite-option
      is-with-bookmark-option
      is-with-watched-option
      is-with-share-option
    />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoChannelLinkSection
  from '@/components/sections/videoChannel/BaseVideoChannelLinkSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseVideoOptionsPopup
  from '@/components/popups/video/BaseVideoOptionsPopup.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'TitleOptionsSection',
  components: {
    BaseHeader,
    BaseVideoChannelLinkSection,
    BaseSelfIcons,
    BaseVideoOptionsPopup
  },
  mixins: [
    selfMixin
  ],
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.videoData
    },
    videoTitle () {
      return this.videoData.title
    }
  }
}
</script>

<style lang="sass" scoped>
.title-options-section
  @extend .d-flex, .align-items-center
  margin-top: 0.75em

.title-section
  @extend .flex-full

.video-options
  margin-left: 1em

.self-icons
  margin-left: 1em
</style>
