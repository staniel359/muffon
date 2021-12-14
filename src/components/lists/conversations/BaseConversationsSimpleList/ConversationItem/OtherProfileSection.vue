<template>
  <div class="main-simple-list-item">
    <BaseProfileImage
      class="small"
      :image="otherProfileImage"
    />

    <div class="content">
      <BaseProfileNickname
        :profileData="otherProfileData"
      />
    </div>
  </div>
</template>

<script>
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseProfileNickname from '@/models/profile/BaseProfileNickname.vue'

export default {
  name: 'OtherProfileSection',
  components: {
    BaseProfileImage,
    BaseProfileNickname
  },
  props: {
    otherProfileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    otherProfileImage () {
      return this.otherProfileData.image.small
    }
  }
}
</script>

<style lang="sass" scoped></style>
