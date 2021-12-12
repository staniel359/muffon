<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="profileFavoritesLink"
        :text="headerText"
      />
    </BaseHeaderContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/links/BaseLink.vue'
import {
  favorites as formatProfileFavoritesLink
} from '#/formatters/links/profile'

export default {
  name: 'HeaderSegment',
  components: {
    BaseSegmentContainer,
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    profileFavoritesLink () {
      return formatProfileFavoritesLink({
        profileId: this.profileId
      })
    },
    headerText () {
      return this.$t(
        'layout.navigation.favorites'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
