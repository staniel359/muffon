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

      <div class="content-container">
        <div
          v-if="content"
          class="text"
          v-text="content"
        />

        <div class="content-section">
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
    content () {
      return this.lastMessageData.content
    },
    isWithArtists () {
      return this.lastMessageData.with_artists
    },
    isWithAlbums () {
      return this.lastMessageData.with_albums
    },
    isWithTracks () {
      return this.lastMessageData.with_tracks
    },
    isWithImages () {
      return this.lastMessageData.with_images
    }
  }
}
</script>

<style lang="sass" scoped>
.main-message-item
  margin-left: 45px
  margin-top: 0.5em
</style>
