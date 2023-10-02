<template>
  <BaseSegmentContainer>
    <BaseItemContainer>
      <BaseZoomableImage
        class="image image-80"
        model="playlist"
        size="small"
        :image-data="imageData"
      />

      <div class="content">
        <div class="middle-aligned">
          <BaseHeader
            tag="h3"
            :text="playlistTitle"
          />

          <BasePrivateIcon
            v-if="isPrivate"
            class="right"
          />
        </div>

        <p
          v-if="description"
          class="description main-formatted-text-container"
          v-text="description"
        />

        <BaseCounterSection
          class="description"
          scope="tracks"
          :count="tracksCount"
        />

        <div class="description">
          <BaseTimestampSection
            class="meta"
            :created="created"
          />
        </div>
      </div>

      <BasePlaylistOptionsPopup
        :playlist-data="playlistData"
        :is-with-add-option="isSelf"
        :is-with-edit-option="isSelf"
        :is-with-delete-option="isSelf"
        is-with-share-option
        is-delete-with-redirect
      />
    </BaseItemContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import BaseCounterSection from '@/components/sections/BaseCounterSection.vue'
import BaseTimestampSection
  from '@/components/sections/BaseTimestampSection.vue'
import BasePlaylistOptionsPopup
  from '@/components/popups/playlist/BasePlaylistOptionsPopup.vue'
import BaseItemContainer
  from '@/components/containers/item/BaseItemContainer.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseZoomableImage,
    BaseHeader,
    BasePrivateIcon,
    BaseCounterSection,
    BaseTimestampSection,
    BasePlaylistOptionsPopup,
    BaseItemContainer
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    tracksCount () {
      return this.playlistData.tracks_count
    },
    created () {
      return this.playlistData.created
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isPrivate () {
      return this.playlistData.private
    },
    description () {
      return this.playlistData.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
