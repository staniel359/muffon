<template>
  <div class="main-account-section">
    <BaseImage
      class="circular image-medium"
      model="profile"
      :image="image"
    />

    <BaseHeader
      class="nickname"
      tag="h4"
      :text="nickname"
    />
  </div>
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'BaseAccountSection',
  components: {
    BaseImage,
    BaseHeader
  },
  props: {
    accountData: {
      type: Object,
      required: true
    }
  },
  computed: {
    image () {
      return this.accountData.image_url
    },
    nickname () {
      return this.accountData.nickname
    }
  }
}
</script>

<style lang="sass" scoped></style>
