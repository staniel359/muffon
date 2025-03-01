<template>
  <div
    id="the-login-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import getProfile from '@/helpers/actions/api/profile/get'
import {
  set as setProfileInfo
} from '@/helpers/actions/profile/info'

export default {
  name: 'TheLoginObserver',
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    profileArgs () {
      return {
        profileId: this.profileId
      }
    }
  },
  watch: {
    profileId: {
      immediate: true,
      handler: 'handleProfileIdChange'
    }
  },
  methods: {
    handleProfileIdChange (
      value
    ) {
      if (value) {
        getProfile(
          this.profileArgs
        ).then(
          this.handleProfileGetSuccess
        )
      }
    },
    handleProfileGetSuccess (
      responseData
    ) {
      const profileData =
        responseData.profile

      setProfileInfo(
        profileData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
