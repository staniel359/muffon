<template>
  <div class="main-simple-list-item">
    <BaseImage
      class="small circular"
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

<style lang="sass" scoped>
.main-simple-list-item
  margin-bottom: 1em
</style>
