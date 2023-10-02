<template>
  <div class="main-simple-list-item middle-aligned not-padded main-top-section">
    <BaseImage
      class="circular image-40"
      model="profile"
      :image="imageData?.extrasmall"
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
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'OtherProfileSection',
  components: {
    BaseImage,
    BaseHeader
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.profileData.image
    },
    profileNickname () {
      return this.profileData.nickname
    }
  }
}
</script>

<style lang="sass" scoped></style>
