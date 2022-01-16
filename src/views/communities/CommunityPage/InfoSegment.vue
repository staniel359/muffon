<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <div class="main-simple-list-item">
      <BaseImage
        class="community-image rounded bordered"
        model="community"
        :image="imageData?.small"
      />

      <div class="content">
        <BaseHeader
          tag="h3"
          :text="communityTitle"
        />

        <div v-if="description">
          {{ description }}
        </div>

        <span
          class="main-link"
          v-html="membersCountText"
          @click="handleMembersCountClick"
        ></span>

        <BaseCommunityMembersModal
          ref="membersModal"
          :communityId="communityId"
        />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '@/images/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseCommunityMembersModal
  from '@/modals/community/BaseCommunityMembersModal.vue'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'InfoSegment',
  components: {
    BaseImage,
    BaseHeader,
    BaseSegmentContainer,
    BaseCommunityMembersModal
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.communityData.image
    },
    communityTitle () {
      return this.communityData.title
    },
    description () {
      return this.communityData.description
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
    },
    communityId () {
      return this.communityData.id.toString()
    }
  },
  methods: {
    handleMembersCountClick () {
      this.$refs.membersModal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.main-simple-list-item
  @extend .align-items-start

.community-image
  width: 75px
  height: 75px
</style>
