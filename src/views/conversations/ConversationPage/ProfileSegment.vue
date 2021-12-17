<template>
  <BaseSegmentContainer>
    <div class="main-simple-list-item">
      <BaseImage
        class="circular bordered"
        model="profile"
        :image="imageData?.small"
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
import BaseImage from '@/images/BaseImage.vue'
import BaseProfileNickname from '@/models/profile/BaseProfileNickname.vue'

export default {
  name: 'ProfileSegment',
  components: {
    BaseSegmentContainer,
    BaseImage,
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
    imageData () {
      return this.profileData.image
    },
    profileId () {
      return this.profileData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
