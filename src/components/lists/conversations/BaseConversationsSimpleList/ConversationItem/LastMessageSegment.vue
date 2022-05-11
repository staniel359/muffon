<template>
  <BaseSegmentContainer
    :class="[
      'main-simple-list-item',
      'main-message-item'
    ]"
  >
    <BaseImage
      class="small circular bordered"
      model="profile"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <BaseProfileNickname
        :profile-data="profileData"
      />

      <BaseTimestamp
        class="description"
        :created="created"
      />

      <div
        v-if="text"
        class="text main-content-section"
        v-text="text"
      />

      <div class="main-content-section">
        <BaseIcon
          v-if="isWithImages"
          icon="grey image"
        />

        <BaseIcon
          v-if="isWithArtists"
          icon="grey microphone alternate"
        />

        <BaseIcon
          v-if="isWithAlbums"
          icon="grey record vinyl"
        />

        <BaseIcon
          v-if="isWithTracks"
          icon="grey music"
        />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseProfileNickname
  from '*/components/models/profile/BaseProfileNickname.vue'
import BaseTimestamp from '*/components/BaseTimestamp.vue'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'LastMessageSegment',
  components: {
    BaseSegmentContainer,
    BaseImage,
    BaseProfileNickname,
    BaseTimestamp,
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
    isWithImages () {
      return this.lastMessageData.attachments.with_images
    },
    isWithArtists () {
      return this.lastMessageData.attachments.with_artists
    },
    isWithAlbums () {
      return this.lastMessageData.attachments.with_albums
    },
    isWithTracks () {
      return this.lastMessageData.attachments.with_tracks
    }
  }
}
</script>

<style lang="sass" scoped>
.main-message-item
  margin-left: 45px
  margin-top: 0.5em
</style>
