<template>
  <div class="main-account-section">
    <BaseImage
      class="circular image-medium"
      model="profile"
      :image="image"
    />

    <div class="nickname-premium-section">
      <BaseHeader
        tag="h4"
        :text="nickname"
      />

      <BaseLabel
        v-if="isPremium"
        class="primary tiny circular premium-label"
        :text="premiumText"
        :is-invertable="false"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'BaseAccountSection',
  components: {
    BaseImage,
    BaseHeader,
    BaseLabel
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
    },
    isPremium () {
      return this.accountData.premium
    },
    premiumText () {
      return this.$t(
        'accounts.premium'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
