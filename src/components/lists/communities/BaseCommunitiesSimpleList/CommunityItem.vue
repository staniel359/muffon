<template>
  <BaseLinkContainer
    class="item main-simple-list-item middle-aligned main-visibility-container"
    :link="communityLink"
    @click="handleLinkClick"
  >
    <BaseIcon
      v-if="isWithModelIcon"
      class="main-simple-list-item-model-icon"
      icon="community"
    />

    <BaseImage
      class="rounded-medium image-50"
      model="community"
      :image="imageData?.small"
    />

    <div class="content">
      <BaseHeader
        class="link"
        tag="h4"
        :text="communityTitle"
      />

      <div
        v-if="description"
        class="description"
      >
        <small
          v-text="description"
        />
      </div>

      <BaseListCounterSection
        v-if="membersCount"
        class="description"
        icon="member"
        :count="membersCount"
      />
    </div>

    <BaseCommunityJoinedMessage
      v-if="isWithJoinOption"
      class="description right main-right-small-section"
      :community-data="communityData"
      is-small
    />

    <BaseCreatedSection
      v-if="isWithCreated"
      class="description right"
      :model-data="communityData"
    />

    <BaseCommunityOptionsPopup
      class="invisible-item"
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
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import BaseCommunityJoinedMessage
  from '@/components/models/community/BaseCommunityJoinedMessage.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseCommunityOptionsPopup
  from '@/components/popups/community/BaseCommunityOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatCommunityLink
} from '@/helpers/formatters/links/community'

export default {
  name: 'CommunityItem',
  components: {
    BaseLinkContainer,
    BaseIcon,
    BaseImage,
    BaseHeader,
    BaseListCounterSection,
    BaseCommunityJoinedMessage,
    BaseCreatedSection,
    BaseCommunityOptionsPopup,
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
    isWithCreated: Boolean,
    isWithJoinOption: Boolean,
    isWithShareOption: Boolean,
    isWithClearButton: Boolean,
    isWithModelIcon: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  computed: {
    communityLink () {
      return formatCommunityLink(
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
    },
    description () {
      return this.communityData.description
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

<style lang="sass" scoped></style>
