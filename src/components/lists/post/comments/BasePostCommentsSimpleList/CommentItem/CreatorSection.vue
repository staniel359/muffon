<template>
  <div class="author">
    <BaseCommunityTitle
      v-if="isByCommunity"
      :community-data="communityData"
    />
    <div
      v-else
      class="middle-aligned"
    >
      <BaseProfileNickname
        :profile-data="profileData"
      />

      <BasePrivateIcon
        v-if="isProfilePrivate"
        class="right small"
      />
    </div>
  </div>
</template>

<script>
import BaseCommunityTitle
  from '@/components/models/community/BaseCommunityTitle.vue'
import BaseProfileNickname
  from '@/components/models/profile/BaseProfileNickname.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'

export default {
  name: 'CreatorSection',
  components: {
    BaseCommunityTitle,
    BaseProfileNickname,
    BasePrivateIcon
  },
  props: {
    commentData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isByCommunity () {
      return this.commentData.by_community
    },
    communityData () {
      return this.commentData.community
    },
    profileData () {
      return this.commentData.profile
    },
    isProfilePrivate () {
      return this.profileData.private
    }
  }
}
</script>

<style lang="sass" scoped></style>
