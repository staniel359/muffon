<template>
  <BaseHeaderContainer
    v-if="profileId"
    class="width-fit-content"
    :tag="tag"
  >
    <BaseLink
      :link="profileLink"
      :text="profileNickname"
    />
  </BaseHeaderContainer>
  <div
    v-else
    v-text="deletedProfileText"
  />
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseLink from '@/components/links/BaseLink.vue'
import {
  main as formatProfileLink
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
    profileLink () {
      return formatProfileLink(
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
    },
    deletedProfileText () {
      return this.$t(
        'deletedModel.profile'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
