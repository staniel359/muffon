<template>
  <BaseHeaderContainer :tag="tag">
    <BaseLink
      :link="profileMainLink"
      :text="profileNickname"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/links/BaseLink.vue'
import { main as formatProfileMainLink } from '#/formatters/links/profile'

export default {
  name: 'BaseProfileNickname',
  components: {
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    profileData: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      default: 'h4'
    }
  },
  computed: {
    profileMainLink () {
      return formatProfileMainLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileData.id
    },
    profileNickname () {
      return this.profileData.nickname
    }
  }
}
</script>

<style lang="sass" scoped></style>
