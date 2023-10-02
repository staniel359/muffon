<template>
  <BaseLinkContainer
    class="item main-simple-list-item middle-aligned main-visibility-container"
    :link="profileLink"
    @click="handleLinkClick"
  >
    <div class="relative">
      <BaseProfileOnlineLabel
        :profile-data="profileData"
      />

      <BaseImage
        class="circular image-50"
        model="profile"
        :image="imageData?.extrasmall"
      />
    </div>

    <div class="content">
      <div class="middle-aligned">
        <BaseHeader
          tag="h4"
          class="link"
          :text="nickname"
        />

        <BasePrivateIcon
          v-if="isPrivate"
          class="right small"
        />

        <BaseLabel
          v-if="isCreator"
          class="primary circular small main-right-small-section"
          :text="roleText"
          :is-invertable="false"
        />
      </div>

      <div
        v-if="isRenderExtraData"
        class="description"
      >
        <small class="middle-aligned">
          <BaseProfileGenderAge
            class="main-list-right-small-section"
            :profile-data="profileData"
          />

          <BaseProfileCityCountry
            class="main-list-right-small-section"
            :profile-data="profileData"
          />
        </small>
      </div>

      <BaseListCounterSection
        v-if="followersCount"
        class="description"
        icon="follower"
        :count="followersCount"
      />

      <PlayingSection
        v-if="playing"
        :playing="playing"
      />
    </div>

    <BaseProfileFollowingMessage
      v-if="otherProfileData"
      class="description right main-right-small-section align-self-center"
      :other-profile-data="otherProfileData"
      is-small
    />

    <BaseCreatedSection
      v-if="isWithCreated"
      class="description right"
      :model-data="profileData"
    />

    <BaseProfileOptionsPopup
      class="invisible-item"
      :profile-data="profileData"
      :is-with-follow-option="!isSelf"
      :is-with-message-option="!isSelf"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import BaseProfileOnlineLabel
  from '@/components/models/profile/BaseProfileOnlineLabel.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'
import BaseProfileGenderAge
  from '@/components/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '@/components/models/profile/BaseProfileCityCountry.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import PlayingSection from './ProfileItem/PlayingSection.vue'
import BaseProfileFollowingMessage
  from '@/components/models/profile/BaseProfileFollowingMessage.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseProfileOptionsPopup
  from '@/components/popups/profile/BaseProfileOptionsPopup.vue'
import {
  main as formatProfileLink
} from '@/helpers/formatters/links/profile'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BasePrivateIcon,
    BaseProfileOnlineLabel,
    BaseLabel,
    BaseProfileGenderAge,
    BaseProfileCityCountry,
    BaseListCounterSection,
    PlayingSection,
    BaseProfileFollowingMessage,
    BaseCreatedSection,
    BaseProfileOptionsPopup
  },
  provide () {
    return {
      setIsFollowing:
        this.setIsFollowing,
      setFollowersCount:
        this.setFollowersCount
    }
  },
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    profileData: {
      type: Object,
      required: true
    },
    isWithCreated: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    profileLink () {
      return formatProfileLink(
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
    isCreator () {
      return (
        this.role === 'creator'
      )
    },
    role () {
      return this.profileData.role
    },
    roleText () {
      return this.$t(
        `roles.${this.role}`
      )
    },
    isSelf () {
      return isCurrentProfile(
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
    },
    isPrivate () {
      return this.profileData.private
    },
    playing () {
      return this.profileData.playing
    },
    followersCount () {
      return this.profileData.followers_count
    },
    isRenderExtraData () {
      return (
        this.gender ||
          this.birthdate ||
          this.country ||
          this.city
      )
    },
    gender () {
      return this.profileData.gender
    },
    birthdate () {
      return this.profileData.birthdate
    },
    country () {
      return this.profileData.country
    },
    city () {
      return this.profileData.city
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
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
      this.paginationItem.followers_count = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
