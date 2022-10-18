<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="communityLink"
    @click="handleLinkClick"
  >
    <BaseImage
      class="rounded bordered"
      model="community"
      :image="imageData?.small"
    />

    <div class="content">
      <BaseHeader
        class="link"
        tag="h4"
        :text="communityTitle"
      />

      <div class="description">
        <small
          v-html="membersCountText"
        />
      </div>
    </div>

    <BaseCommunityJoinedMessage
      v-if="isWithJoinOption"
      class="joined-message"
      :community-data="communityData"
      is-small
    />

    <BaseCommunityOptionsDropdown
      :community-data="communityData"
      :is-with-join-option="isWithJoinOption"
      :is-with-share-option="isWithShareOption"
    />

    <BaseClearButton
      v-if="isWithClearButton"
      @click="handleClearButtonClick"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseCommunityJoinedMessage
  from '@/components/models/community/BaseCommunityJoinedMessage.vue'
import BaseCommunityOptionsDropdown
  from '@/components/dropdowns/community/BaseCommunityOptionsDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatCommunityMainLink
} from '@/helpers/formatters/links/community'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'CommunityItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseCommunityJoinedMessage,
    BaseCommunityOptionsDropdown,
    BaseClearButton
  },
  provide () {
    return {
      setIsMember: this.setIsMember,
      setMembersCount: this.setMembersCount
    }
  },
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    communityData: {
      type: Object,
      required: true
    },
    isWithJoinOption: Boolean,
    isWithShareOption: Boolean,
    isWithClearButton: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  computed: {
    communityLink () {
      return formatCommunityMainLink(
        {
          communityId: this.communityId
        }
      )
    },
    communityId () {
      return this.communityData.id
    },
    imageData () {
      return this.communityData.image
    },
    communityTitle () {
      return this.communityData.title
    },
    membersCountText () {
      return this.$tc(
        'counters.nominative.members',
        this.membersCount,
        {
          count: this.membersCountStrong
        }
      )
    },
    membersCountStrong () {
      return `<strong>${this.membersCountFormatted}</strong>`
    },
    membersCountFormatted () {
      return formatNumber(
        this.membersCount
      )
    },
    membersCount () {
      return this.communityData.members_count
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.communityData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick',
        {
          uuid: this.uuid
        }
      )
    },
    setIsMember (
      value
    ) {
      this.paginationItem
        .profile
        .member_of_community = value
    },
    setMembersCount (
      value
    ) {
      this.paginationItem
        .members_count = value
    }
  }
}
</script>

<style lang="sass" scoped>
.joined-message
  margin-left: 0.5em
</style>
