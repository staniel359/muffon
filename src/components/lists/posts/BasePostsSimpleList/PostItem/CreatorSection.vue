<template>
  <div>
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
    postData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isByCommunity () {
      return this.postData.by_community
    },
    communityData () {
      return this.postData.community
    },
    profileData () {
      return this.postData.profile
    },
    isProfilePrivate () {
      return this.profileData.private
    }
  }
}
</script>

<style lang="sass" scoped></style>
