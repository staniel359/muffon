<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    scope="tags"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps.tags"
        :profileId="profileId"
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import {
  tags as formatProfileLibraryTagsLink
} from '*/helpers/formatters/links/profile/library'

export default {
  name: 'TagsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseTagsList
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 20
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryTagsLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
