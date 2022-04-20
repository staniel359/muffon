<template>
  <div class="item">
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
            class="text main-text-container"
            v-text="content"
          />

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
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseProfileNickname
  from '*/components/models/profile/BaseProfileNickname.vue'
import BaseTimestamp from '*/components/BaseTimestamp.vue'
import BaseImagesSection from '*/components/BaseImagesSection.vue'
import BaseTracksSection from '*/components/BaseTracksSection.vue'

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
