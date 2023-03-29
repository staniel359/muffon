<template>
  <BaseHeaderContainer
    :tag="tag"
  >
    <BaseLink
      :link="communityLink"
      :text="communityTitle"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseLink from '@/components/links/BaseLink.vue'
import {
  main as formatCommunityLink
} from '@/helpers/formatters/links/community'

export default {
  name: 'BaseCommunityTitle',
  components: {
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    communityData: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      default: 'h4'
    }
  },
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
    communityTitle () {
      return this.communityData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
