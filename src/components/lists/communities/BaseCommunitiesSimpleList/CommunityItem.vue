<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="communityLink"
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

      <div
        class="description"
        v-html="membersCountText"
      ></div>
    </div>

    <BaseOptionsDropdown
      isWithJoinOption
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/images/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import {
  community as formatCommunityLink
} from '#/formatters/links/communities'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'CommunityItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseOptionsDropdown
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    communityLink () {
      return formatCommunityLink({
        communityId: this.communityId
      })
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
      return this.$t(
        'counters.members',
        { count: this.membersCountStrong }
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
