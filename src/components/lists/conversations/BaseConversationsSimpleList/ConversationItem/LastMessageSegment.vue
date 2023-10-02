<template>
  <BaseSegmentContainer
    class="main-simple-list-item main-message-item main-bottom-section"
  >
    <BaseImage
      class="circular image-30"
      model="profile"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <BaseProfileNickname
        :profile-data="profileData"
      />

      <BaseTimestampSection
        class="description"
        :created="created"
      />

      <div
        v-if="text"
        class="text main-sendable-content-section"
        v-text="text"
      />

      <div
        v-if="isAnyAttachments"
        class="main-sendable-content-section"
      >
        <BaseIcon
          v-if="isWithImages"
          class="grey"
          icon="image"
        />

        <BaseIcon
          v-if="isWithArtists"
          class="grey"
          icon="artist"
        />

        <BaseIcon
          v-if="isWithAlbums"
          class="grey"
          icon="album"
        />

        <BaseIcon
          v-if="isWithTracks"
          class="grey"
          icon="track"
        />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseProfileNickname
  from '@/components/models/profile/BaseProfileNickname.vue'
import BaseTimestampSection
  from '@/components/sections/BaseTimestampSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'LastMessageSegment',
  components: {
    BaseSegmentContainer,
    BaseImage,
    BaseProfileNickname,
    BaseTimestampSection,
    BaseIcon
  },
  props: {
    lastMessageData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.profileData.image
    },
    profileData () {
      return this.lastMessageData.profile
    },
    created () {
      return this.lastMessageData.created
    },
    text () {
      return this.lastMessageData.text
    },
    isAnyAttachments () {
      return Object.keys(
        this.attachments
      ).length
    },
    attachments () {
      return this.lastMessageData.attachments
    },
    isWithImages () {
      return this.attachments.with_images
    },
    isWithArtists () {
      return this.attachments.with_artists
    },
    isWithAlbums () {
      return this.attachments.with_albums
    },
    isWithTracks () {
      return this.attachments.with_tracks
    }
  }
}
</script>

<style lang="sass" scoped>
[dir="ltr"]
  .main-message-item
    margin-left: 4rem
[dir="rtl"]
  .main-message-item
    margin-right: 4rem
</style>
