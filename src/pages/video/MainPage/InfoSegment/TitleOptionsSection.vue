<template>
  <div class="middle-aligned main-bottom-section">
    <div class="flex-full">
      <BaseHeader
        tag="h3"
        :text="videoTitle"
      />

      <BaseVideoChannelLinkSection
        class="channel-link-section"
        :model-data="videoData"
      />
    </div>

    <BaseSelfIcons
      class="main-right-section"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :watched-id="watchedId"
    />

    <BaseVideoOptionsPopup
      class="main-right-section"
      :video-data="videoData"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :watched-id="watchedId"
      is-with-favorite-option
      is-with-bookmark-option
      is-with-watched-option
      is-with-share-option
      is-with-external-link-option
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
.channel-link-section
  margin-top: 0.25rem
</style>
