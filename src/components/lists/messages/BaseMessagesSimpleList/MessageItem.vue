<template>
  <BaseSegmentContainer
    class="main-simple-list-item"
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
        <div class="text main-text-container">
          {{ content }}
        </div>

        <BaseImagesSection
          v-if="images"
          class="content-section"
          :images="images"
        />

        <BaseTracksSection
          v-if="tracks"
          class="content-section"
          :tracks="tracks"
        />
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
import BaseImagesSection from '@/BaseImagesSection.vue'
import BaseTracksSection from '@/BaseTracksSection.vue'

export default {
  name: 'MessageItem',
  components: {
    BaseSegmentContainer,
    BaseProfileImage,
    BaseProfileNickname,
    BaseTimestamp,
    BaseImagesSection,
    BaseTracksSection
  },
  props: {
    messageData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileImage () {
      return this.profileData.image.extrasmall
    },
    profileData () {
      return this.messageData.profile
    },
    content () {
      return this.messageData.content
    },
    created () {
      return this.messageData.created
    },
    images () {
      return this.messageData.images
    },
    tracks () {
      return this.messageData.tracks
    }
  }
}
</script>

<style lang="sass" scoped>
.main-simple-list-item
  @extend .align-items-start
</style>
