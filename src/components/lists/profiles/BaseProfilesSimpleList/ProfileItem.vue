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
          :class="{ link: isMainLinkActive }"
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
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseHeader from '@/BaseHeader.vue'
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
    BaseProfileImage,
    BaseHeader,
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
      setIsFollowing: this.setIsFollowing
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
    image () {
      return this.profileData.image.extrasmall
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
        `shared.profile.roles.${this.role}`
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
      this.findPaginationItem({
        uuid: this.uuid
      }).other_profile.follower_of_profile = value
    }
  }
}
</script>

<style lang="sass" scoped>
.nickname-label-container
  @extend .d-flex, .align-items-center

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
