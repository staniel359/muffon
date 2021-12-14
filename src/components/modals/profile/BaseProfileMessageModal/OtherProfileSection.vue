<template>
  <div class="other-profile-item main-simple-list-item">
    <BaseProfileImage
      class="small"
      :image="profileImage"
    />

    <div class="content">
      <BaseHeader
        tag="h4"
        :text="profileNickname"
      />
    </div>
  </div>
</template>

<script>
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseHeader from '@/BaseHeader.vue'

export default {
  name: 'OtherProfileSection',
  components: {
    BaseProfileImage,
    BaseHeader
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileImage () {
      return this.profileData.image.small
    },
    profileNickname () {
      return this.profileData.nickname
    }
  }
}
</script>

<style lang="sass" scoped>
.other-profile-item
  margin-bottom: 1em
</style>
