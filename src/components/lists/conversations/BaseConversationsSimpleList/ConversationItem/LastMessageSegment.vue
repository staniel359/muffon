<template>
  <BaseSegmentContainer
    class="main-simple-list-item last-message-item"
  >
    <BaseProfileImage
      class="small"
      :image="profileImage"
    />

    <div class="content">
      <BaseProfileNickname
        :profileData="profileData"
      />

      <BaseTimestamp
        class="description"
        :created="created"
      />

      <div class="content-container">
        <div
          v-if="content"
          class="text"
        >
          {{ content }}
        </div>

        <div class="content-section">
          <i
            v-if="isWithTracks"
            class="grey music icon"
          ></i>

          <i
            v-if="isWithImages"
            class="grey image icon"
          ></i>
        </div>
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseProfileNickname from '@/models/profile/BaseProfileNickname.vue'
import BaseTimestamp from '@/BaseTimestamp.vue'

export default {
  name: 'LastMessageSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileImage,
    BaseProfileNickname,
    BaseTimestamp
  },
  props: {
    lastMessageData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileImage () {
      return this.profileData.image.extrasmall
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
.last-message-item
  @extend .align-items-start
  margin-left: 45px
  margin-top: 0.5em
</style>
