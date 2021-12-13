<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="profileMainLink"
  >
    <BaseProfileImage
      class="circular bordered"
      :image="image"
    />

    <div class="content">
      <div class="nickname-label-container">
        <BaseHeader
          tag="h4"
          :text="nickname"
        />

        <BaseLabel
          v-if="isStaff"
          class="small primary role-label"
          :text="roleText"
        />
      </div>

      <div class="description">
        <small>
          <BaseProfileGenderAge
            v-if="gender || birthdate"
            :gender="gender"
            :birthdate="birthdate"
          />
        </small>

        <small>
          <BaseProfileCityCountry
            v-if="city || country"
            :city="city"
            :country="country"
          />
        </small>
      </div>

      <small>
        <BaseFollowingMessage
          class="following-message"
          :profileData="profileData"
        />
      </small>
    </div>

    <BaseLinkContainer
      v-if="isRenderFollowButton"
    >
      <BaseFollowButton
        class="tiny compact follow-button"
        :profileData="profileData"
      />
    </BaseLinkContainer>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseLabel from '@/BaseLabel.vue'
import BaseProfileGenderAge from '@/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '@/models/profile/BaseProfileCityCountry.vue'
import BaseFollowingMessage from '@/models/profile/BaseFollowingMessage.vue'
import BaseFollowButton from '@/models/profile/BaseFollowButton.vue'
import { main as formatProfileMainLink } from '#/formatters/links/profile'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseProfileImage,
    BaseHeader,
    BaseLabel,
    BaseProfileGenderAge,
    BaseProfileCityCountry,
    BaseFollowingMessage,
    BaseFollowButton
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileMainLink () {
      return formatProfileMainLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileData.id.toString()
    },
    image () {
      return this.profileData.image.extrasmall
    },
    nickname () {
      return this.profileData.nickname
    },
    gender () {
      return this.profileData.gender
    },
    birthdate () {
      return this.profileData.birthdate
    },
    city () {
      return this.profileData.city
    },
    country () {
      return this.profileData.country
    },
    isStaff () {
      return this.role === 'creator'
    },
    role () {
      return this.profileData.role
    },
    roleText () {
      return this.$t(
        `shared.profile.roles.${this.role}`
      )
    },
    isRenderFollowButton () {
      return !isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.nickname-label-container
  @extend .d-flex, .align-items-center

.role-label
  margin-left: 0.5em

.following-message
  margin-top: 0.5em

.follow-button
  @extend .no-margin
  margin-left: 0.5em !important
</style>
