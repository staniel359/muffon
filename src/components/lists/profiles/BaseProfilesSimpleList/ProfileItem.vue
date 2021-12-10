<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="profileMainLinkFormatted"
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
          :text="roleFormatted"
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
    </div>
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
import { main as formatProfileMainLink } from '#/formatters/links/profile'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseProfileImage,
    BaseHeader,
    BaseLabel,
    BaseProfileGenderAge,
    BaseProfileCityCountry
  },
  props: {
    profileData: {
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
    roleFormatted () {
      return this.$t(
        `shared.profile.roles.${this.role}`
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
</style>
