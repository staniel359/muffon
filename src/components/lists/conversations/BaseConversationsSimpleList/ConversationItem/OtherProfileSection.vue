<template>
  <div class="main-simple-list-item">
    <BaseImage
      class="small circular bordered"
      model="profile"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <BaseProfileNickname
        :profileData="otherProfileData"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseProfileNickname
  from '*/components/models/profile/BaseProfileNickname.vue'

export default {
  name: 'OtherProfileSection',
  components: {
    BaseImage,
    BaseProfileNickname
  },
  props: {
    otherProfileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.otherProfileData.image
    }
  }
}
</script>

<style lang="sass" scoped></style>
