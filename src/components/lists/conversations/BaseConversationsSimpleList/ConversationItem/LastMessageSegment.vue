<template>
  <BaseSegmentContainer
    class="main-simple-list-item main-message-item"
  >
    <BaseImage
      class="small circular bordered"
      model="profile"
      :image="imageData?.extrasmall"
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
import BaseImage from '@/images/BaseImage.vue'
import BaseProfileNickname from '@/models/profile/BaseProfileNickname.vue'
import BaseTimestamp from '@/BaseTimestamp.vue'

export default {
  name: 'LastMessageSegment',
  components: {
    BaseSegmentContainer,
    BaseImage,
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
