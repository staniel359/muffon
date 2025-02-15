<template>
  <span
    class="main-link"
    @click="handleClick"
    v-html="followingText"
  />

  <BaseProfileFollowModal
    ref="modal"
    scope="following"
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
  name: 'FollowingSection',
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
    followingText () {
      return this.$t(
        'counters.nominative.following',
        this.followingCount,
        {
          count: this.followingCountStrong
        }
      )
    },
    followingCount () {
      return this.profileData.following_count
    },
    followingCountStrong () {
      return `
        <strong>
          ${this.followingCountFormatted}
        </strong>
      `
    },
    followingCountFormatted () {
      return formatNumber(
        this.followingCount
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
