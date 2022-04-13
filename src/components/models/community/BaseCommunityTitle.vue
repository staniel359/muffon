<template>
  <BaseHeaderContainer :tag="tag">
    <BaseLink
      :link="communityMainLink"
      :text="communityTitle"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import {
  main as formatCommunityMainLink
} from '*/helpers/formatters/links/community'

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
    communityMainLink () {
      return formatCommunityMainLink(
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
