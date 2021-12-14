<template>
  <BaseSegmentContainer>
    <div class="main-simple-list-item">
      <BaseProfileImage
        :image="profileImage"
      />

      <div class="content">
        <BaseProfileNickname
          tag="h3"
          :profileData="profileData"
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

export default {
  name: 'ProfileSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileImage,
    BaseProfileNickname
  },
  props: {
    conversationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileData () {
      return this.conversationData.profile
    },
    profileImage () {
      return this.profileData.image.small
    },
    profileId () {
      return this.profileData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
