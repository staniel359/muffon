<template>
  <div class="main-simple-list-item middle-aligned not-padded">
    <BaseImage
      class="circular image-40"
      model="profile"
      :image="image"
    />

    <div class="content">
      <BaseHeader
        tag="h4"
        :text="nickname"
      />

      <BaseLabel
        v-if="isPremium"
        class="primary tiny circular main-bottom-mini-section"
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
