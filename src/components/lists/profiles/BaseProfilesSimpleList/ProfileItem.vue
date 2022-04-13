<template>
  <BaseLinkContainer
    class="item main-simple-list-item main-profile-item"
    :link="profileMainLink"
    @click="handleLinkClick"
  >
    <BaseImage
      class="circular bordered"
      model="profile"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <div class="nickname-label-container">
        <BaseHeader
          tag="h4"
          class="link"
          :text="nickname"
        />

        <BaseProfileOnlineLabel
          class="online-label"
          :profile-data="profileData"
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
            :profile-data="profileData"
          />

          <BaseProfileCityCountry
            :profile-data="profileData"
          />

          <BaseProfileFollowCounters
            class="follow-counters"
            :profile-data="profileData"
          />
        </small>
      </div>
    </div>

    <small class="following-message">
      <BaseProfileFollowingMessage
        :other-profile-data="otherProfileData"
      />
    </small>

    <template v-if="isRenderOptions">
      <BaseOptionsDropdown
        :profile-data="profileData"
        is-with-follow-option
        is-with-message-option
        @message="handleMessageOptionClick"
      />

      <BaseProfileMessageModal
        ref="messageModal"
        :profile-data="profileData"
      />
    </template>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseProfileOnlineLabel
  from '*/components/models/profile/BaseProfileOnlineLabel.vue'
import BaseLabel from '*/components/BaseLabel.vue'
import BaseProfileGenderAge
  from '*/components/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '*/components/models/profile/BaseProfileCityCountry.vue'
import BaseProfileFollowCounters
  from '*/components/models/profile/BaseProfileFollowCounters.vue'
import BaseProfileFollowingMessage
  from '*/components/models/profile/BaseProfileFollowingMessage.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseProfileMessageModal
  from '*/components/modals/profile/BaseProfileMessageModal.vue'
import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseProfileOnlineLabel,
    BaseLabel,
    BaseProfileGenderAge,
    BaseProfileCityCountry,
    BaseProfileFollowCounters,
    BaseProfileFollowingMessage,
    BaseOptionsDropdown,
    BaseProfileMessageModal
  },
  provide () {
    return {
      setIsFollowing: this.setIsFollowing,
      setFollowersCount: this.setFollowersCount
    }
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'linkClick'
  ],
  computed: {
    profileMainLink () {
      return formatProfileMainLink(
        {
          profileId: this.profileId
        }
      )
    },
    profileId () {
      return this.profileData.id.toString()
    },
    imageData () {
      return this.profileData.image
    },
    nickname () {
      return this.profileData.nickname
    },
    isStaff () {
      return this.role === 'creator'
    },
    role () {
      return this.profileData.role
    },
    roleText () {
      return this.$t(
        `roles.${this.role}`
      )
    },
    isRenderOptions () {
      return !isCurrentProfile(
        this.profileId
      )
    },
    otherProfileData () {
      return this.profileData.other_profile
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.profileData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleMessageOptionClick () {
      this.$refs
        .messageModal
        .show()
    },
    setIsFollowing (
      value
    ) {
      this.paginationItem
        .other_profile
        .follower_of_profile = value
    },
    setFollowersCount (
      value
    ) {
      this.paginationItem
        .follower_profiles_count = value
    }
  }
}
</script>

<style lang="sass" scoped>
.nickname-label-container
  @extend .d-flex, .align-items-center

.online-label
  margin-left: 0.5em

.role-label
  margin-left: 0.5em

.follow-counters
  @extend .d-flex
  ::v-deep(.following)
    margin-left: 0.5em

.following-message
  margin-left: 0.5em

.follow-button
  @extend .no-margin
  margin-left: 0.5em !important
</style>
