<template>
  <BaseSegmentContainer>
    <BaseItemContainer>
      <BaseImage
        class="circular image-50"
        model="profile"
        :image="imageData?.small"
      />

      <div class="middle aligned content">
        <BaseProfileNickname
          tag="h3"
          :profile-data="profileData"
        />
      </div>
    </BaseItemContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseProfileNickname
  from '@/components/models/profile/BaseProfileNickname.vue'
import BaseItemContainer
  from '@/components/containers/item/BaseItemContainer.vue'

export default {
  name: 'ProfileSegment',
  components: {
    BaseSegmentContainer,
    BaseImage,
    BaseProfileNickname,
    BaseItemContainer
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
