<template>
  <div class="left-column">
    <BaseZoomableImage
      model="profile"
      size="medium"
      :image-data="imageData"
      is-circular
    />

    <div class="main-self-container self-options-container">
      <BaseSelfIcons
        :bookmark-id="bookmarkId"
      />

      <BaseVideoChannelOptionsPopup
        :channel-data="channelData"
        :bookmark-id="bookmarkId"
        is-with-bookmark-option
        is-with-share-option
      />
    </div>
  </div>
</template>

<script>
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseVideoChannelOptionsPopup
  from '@/components/popups/videoChannel/BaseVideoChannelOptionsPopup.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'LeftColumn',
  components: {
    BaseZoomableImage,
    BaseSelfIcons,
    BaseVideoChannelOptionsPopup
  },
  mixins: [
    selfMixin
  ],
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.channelData
    },
    imageData () {
      return this.channelData.image
    }
  }
}
</script>

<style lang="sass" scoped>
.left-column
  width: 120px

.self-options-container
  margin-top: 0.5em
</style>
