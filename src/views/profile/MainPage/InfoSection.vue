<template>
  <div class="profile-info-section">
    <BaseProfileAvatar
      class="profile-avatar"
      :avatar="avatar"
    />

    <div>
      <BaseHeader
        tag="h2"
        :text="nickname"
      />

      <div>
        {{ ageWithGender }}
      </div>

      <div>
        {{ countryWithCity }}
      </div>
    </div>
  </div>
</template>

<script>
import countries from 'i18n-iso-countries'
import BaseProfileAvatar from '@/models/profile/BaseProfileAvatar.vue'
import BaseHeader from '@/BaseHeader.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseProfileAvatar,
    BaseHeader
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    avatar () {
      return this.profileData.avatar_url
    },
    nickname () {
      return this.profileData.nickname
    },
    ageWithGender () {
      return [
        this.age,
        this.gender
      ].filter(e => e).join(', ')
    },
    age () {
      if (this.birthdate) {
        return Math.floor(
          (
            new Date() -
              new Date(this.birthdate)
          ) / 1000 / 60 / 60 / 24 / 365
        )
      } else {
        return null
      }
    },
    birthdate () {
      return this.profileData.birthdate
    },
    gender () {
      return this.profileData.gender
    },
    countryWithCity () {
      return [
        this.city,
        this.country
      ].filter(e => e).join(', ')
    },
    city () {
      return this.profileData.city
    },
    country () {
      return countries.getName(
        this.profileData.country,
        'en'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-info-section
  @extend .d-flex

.profile-avatar
  width: 100px
  height: 100px
  margin-right: 1em
</style>
