<template>
  <div class="main-library-info">
    <BaseProfileImage
      class="main-library-info-image"
      :image="image"
    />

    <BaseHeader
      tag="h3"
      :text="nickname"
    />
  </div>
</template>

<script>
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseHeader from '@/BaseHeader.vue'

export default {
  name: 'MainInfoSection',
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
    image () {
      return this.profileData.image_url
    },
    nickname () {
      return this.profileData.nickname
    }
  }
}
</script>

<style lang="sass" scoped>
.main-library-info-image
  width: 120px
  height: 120px
</style>
