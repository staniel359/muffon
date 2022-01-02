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
import BaseImage from '@/images/BaseImage.vue'
import BaseProfileNickname from '@/models/profile/BaseProfileNickname.vue'
import BaseTimestamp from '@/BaseTimestamp.vue'
import BaseImagesSection from '@/BaseImagesSection.vue'
import BaseTracksSection from '@/BaseTracksSection.vue'

export default {
  name: 'MessageItem',
  components: {
    BaseSegmentContainer,
    BaseImage,
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
    imageData () {
      return this.profileData.image
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

<style lang="sass" scoped></style>
