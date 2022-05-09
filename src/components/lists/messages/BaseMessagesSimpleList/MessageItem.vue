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

        <BaseSendableContentSection
          :model-data="messageData"
        />
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
import BaseSendableContentSection
  from '*/components/models/sendable/BaseSendableContentSection.vue'

export default {
  name: 'MessageItem',
  components: {
    BaseSegmentContainer,
    BaseImage,
    BaseProfileNickname,
    BaseTimestamp,
    BaseSendableContentSection
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
    created () {
      return this.messageData.created
    }
  }
}
</script>

<style lang="sass" scoped></style>
