<template>
  <div class="header">
    <BaseLink
      :link="profileMainLinkFormatted"
      :text="profileNickname"
    />
  </div>
</template>

<script>
import BaseLink from '@/BaseLink.vue'
import { main as formatProfileMainLink } from '#/formatters/links/profile'

export default {
  name: 'NicknameSection',
  components: {
    BaseLink
  },
  props: {
    postData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileMainLinkFormatted () {
      return formatProfileMainLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.postData.profile.id
    },
    profileNickname () {
      return this.postData.profile.nickname
    }
  }
}
</script>

<style lang="sass" scoped></style>
