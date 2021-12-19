<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="profileMainLink"
  >
    <BaseImage
      class="circular bordered"
      model="profile"
      :image="imageData?.small"
    />

    <div class="content">
      <div class="nickname-label-container">
        <BaseHeader
          tag="h4"
          :class="{ link: isMainLinkActive }"
          :text="nickname"
        />

        <BaseProfileOnlineLabel
          class="online-label"
          :profileData="profileData"
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
            :profileData="profileData"
          />

          <BaseProfileCityCountry
            :profileData="profileData"
          />

          <BaseProfileFollowingCount
            class="following-count"
            :profileData="profileData"
            @activeLinkChange="handleActiveLinkChange"
          />
        </small>
      </div>
    </div>

    <small class="following-message">
      <BaseProfileFollowingMessage
        :otherProfileData="otherProfileData"
      />
    </small>

    <template v-if="isRenderOptions">
      <BaseOptionsDropdown
        :profileData="profileData"
        isWithFollowOption
        isWithMessageOption
        @message="handleMessageOptionClick"
      />

      <BaseProfileMessageModal
        ref="messageModal"
        :profileData="profileData"
      />
    </template>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/images/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseProfileOnlineLabel
  from '@/models/profile/BaseProfileOnlineLabel.vue'
import BaseLabel from '@/BaseLabel.vue'
import BaseProfileGenderAge from '@/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '@/models/profile/BaseProfileCityCountry.vue'
import BaseProfileFollowingCount
  from '@/models/profile/BaseProfileFollowingCount.vue'
import BaseProfileFollowingMessage
  from '@/models/profile/BaseProfileFollowingMessage.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BaseProfileMessageModal
  from '@/modals/profile/BaseProfileMessageModal.vue'
import { main as formatProfileMainLink } from '#/formatters/links/profile'
import { isCurrentProfile } from '#/utils'

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
    BaseProfileFollowingCount,
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
  data () {
    return {
      isMainLinkActive: true
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
      return this.findPaginationItem({
        uuid: this.uuid
      })
    },
    uuid () {
      return this.profileData.uuid
    }
  },
  methods: {
    handleMessageOptionClick () {
      this.$refs.messageModal.show()
    },
    handleActiveLinkChange (value) {
      this.isMainLinkActive = !value
    },
    setIsFollowing (value) {
      this.paginationItem
        .other_profile.follower_of_profile = value
    },
    setFollowersCount (value) {
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

.following-count
  @extend .d-flex
  ::v-deep(.followers)
    margin-left: 0.5em

.following-message
  margin-left: 0.5em

.follow-button
  @extend .no-margin
  margin-left: 0.5em !important
</style>
