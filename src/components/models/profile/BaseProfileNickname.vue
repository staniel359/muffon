<template>
  <BaseHeaderContainer
    :tag="tag"
  >
    <BaseLink
      :link="profileMainLink"
      :text="profileNickname"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseLink from '@/components/links/BaseLink.vue'
import {
  main as formatProfileMainLink
} from '@/helpers/formatters/links/profile'

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
      return formatProfileMainLink(
        {
          profileId: this.profileId
        }
      )
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

<style lang="sass" scoped>
.header
  @extend .width-fit-content
</style>
