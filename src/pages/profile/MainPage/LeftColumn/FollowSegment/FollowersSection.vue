<template>
  <span
    class="main-link"
    @click="handleClick"
    v-html="followersText"
  />

  <BaseProfileFollowModal
    ref="modal"
    scope="followers"
    :profile-id="profileId"
  />
</template>

<script>
import BaseProfileFollowModal
  from '@/components/modals/profile/BaseProfileFollowModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'FollowersSection',
  components: {
    BaseProfileFollowModal
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    followersText () {
      return this.$t(
        'counters.nominative.followers',
        this.followersCount,
        {
          count: this.followersCountStrong
        }
      )
    },
    followersCount () {
      return this.profileData.followers_count
    },
    followersCountStrong () {
      return `<strong>${this.followersCountFormatted}</strong>`
    },
    followersCountFormatted () {
      return formatNumber(
        this.followersCount
      )
    },
    profileId () {
      return this.profileData.id.toString()
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
